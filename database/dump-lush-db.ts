import * as http from "http";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
import { spawn } from "child_process";
import * as path from "path";

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const defaultDumpDir = "./dump";
let dumpDir = defaultDumpDir;
let tablesCount = 0;
let dumpedTableIndex = 0;

const relatedScriptsCount = 2;
let prefixLength = 0;
let sqlScriptIndex = 0;

type DbTable = { name: string };

(async () => {
  await createDir();

  if (process.argv.slice(2)[0] === "--split") {
    http.get(
      `http://${SERVER_HOST}:${SERVER_PORT}/api/db-tables`,
      (response) => {
        let body = "";

        response.on("data", (chunk) => {
          body += chunk;
        });

        response.on("end", async () => {
          const tables = JSON.parse(body);
          tablesCount = tables.length;
          prefixLength = getPrefixWidth(tables.length);

          await dumpDatabaseSplit(tables);
        });
      }
    );
  } else {
    await dumpDatabase();
  }
})();

const getPrefixWidth = (tablesLength: number) =>
  (tablesLength + relatedScriptsCount).toString().length;

async function createDir() {
  if (process.argv.slice(2)[1] !== "--default-dir") {
    try {
      dumpDir = await promptDirPath();
    } catch (error) {
      console.log(error);
    }
  }

  if (!fs.existsSync(dumpDir)) {
    fs.mkdirSync(dumpDir);
    console.log(`\`${dumpDir}\` directory created.`);
  }

  console.log(`Using \`${dumpDir}\` directory.`);
}

async function promptDirPath() {
  return new Promise<string>((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let dirPath = "";

    rl.question("Directory: ", (dirPathOut) => {
      dirPath = dirPathOut;
      rl.close();
    });

    rl.on("close", () => {
      try {
        if (fs.lstatSync(dirPath).isDirectory()) {
          resolve(dirPath);
        }

        reject("Invalid directory path");
      } catch (error) {
        reject("Invalid directory path. " + error);
      }
    });

    rl.on("error", () => {
      reject("Error occured in `promptDirPath`");
    });
  });
}

async function dumpDatabase() {
  return new Promise<number>((resolve, reject) => {
    console.log(`Dumping \`lush\` db...`);

    const dumpSpawn = spawn("mysqldump", ["--databases", "lush", "--routines"]);

    const fd = fs.openSync(`${dumpDir}/dump.sql`, "w");

    dumpSpawn.stdout.on("data", (data) => {
      fs.writeFileSync(fd, data);
    });

    dumpSpawn.on("exit", (code) => {
      fs.close(fd);
      code === 0 ? resolve(code) : reject(code);
    });

    dumpSpawn.on("error", (error) => {
      fs.close(fd);
      reject(error);
    });
  }).then(() => console.log(`\`lush\` db dumped.`));
}

async function dumpDatabaseSplit(tables: DbTable[]) {
  console.log(`Dumping \`lush\` db...`);

  const pendingDumps = [];
  pendingDumps.push(dumpStructure(), dumpTables(tables), dumpRoutines());

  await Promise.allSettled(pendingDumps);

  console.log(`\`lush\` db dumped.`);
}

const getSqlFilePrefix = () => {
  const zerosLength = prefixLength - sqlScriptIndex.toString().length;
  let zeros: string = "";

  for (let index = 0; index < zerosLength; index++) {
    zeros += "0";
  }

  return (zeros += sqlScriptIndex++);
};

async function dumpStructure() {
  return new Promise<number>((resolve, reject) => {
    console.log("Dumping structure...");

    const dumpFilePath = path.resolve(
      __dirname,
      `${dumpDir}/${getSqlFilePrefix()}-structure-dump.sql`
    );

    const dumpSpawn = spawn("mysqldump", ["--databases", "lush", "--no-data"]);

    const fd = fs.openSync(dumpFilePath, "w");

    dumpSpawn.stdout.on("data", (data) => {
      fs.writeFileSync(fd, data);
    });

    dumpSpawn.on("exit", (code) => {
      fs.close(fd);
      code === 0 ? resolve(code) : reject(code);
    });

    dumpSpawn.on("error", (error) => {
      fs.close(fd);
      reject(error);
    });
  })
    .then(() => console.log("Structure dumped."))
    .catch((error) => console.error(error));
}

async function dumpTables(tables: DbTable[]) {
  const pendingDumps = [];
  for (const table of tables) {
    pendingDumps.push(dumpTable(table));
  }

  await Promise.allSettled(pendingDumps);
}

function writeUseDb(filePath: string) {
  fs.writeFileSync(filePath, `USE \`lush\`;\r\n\r\n`);
}

async function dumpTable(table: DbTable) {
  return new Promise<string>((resolve, reject) => {
    console.log(`Dumping \`${table.name}\` table...`);

    const dumpFilePath = `${dumpDir}/${getSqlFilePrefix()}-${
      table.name
    }-dump.sql`;

    writeUseDb(dumpFilePath);

    const dumpSpawn = spawn("mysqldump", [
      "lush",
      table.name,
      "--no-create-info",
    ]);

    const fd = fs.openSync(dumpFilePath, "a");

    dumpSpawn.stdout.on("data", (data) => {
      fs.writeFileSync(fd, data);
    });

    dumpSpawn.on("exit", (code) => {
      fs.close(fd);
      code === 0 ? resolve(table.name) : reject(code);
    });

    dumpSpawn.on("error", (error) => {
      fs.close(fd);
      reject(error);
    });
  })
    .then((tableName) => {
      console.log(
        `${++dumpedTableIndex}/${tablesCount} \`${tableName}\` table dumped.`
      );
    })
    .catch((error) => console.error(error));
}

async function dumpRoutines() {
  return new Promise<number>((resolve, reject) => {
    console.log("Dumping routines...");

    const dumpFilePath = `${dumpDir}/${getSqlFilePrefix()}-routines-dump.sql`;

    writeUseDb(dumpFilePath);

    const dumpSpawn = spawn("mysqldump", [
      "lush",
      "--routines",
      "--no-create-db",
      "--no-data",
      "--no-create-info",
    ]);

    const fd = fs.openSync(dumpFilePath, "a");

    dumpSpawn.stdout.on("data", (data) => {
      fs.writeFileSync(fd, data);
    });

    dumpSpawn.on("exit", (code) => {
      fs.close(fd);
      code === 0 ? resolve(code) : reject(code);
    });

    dumpSpawn.on("error", (error) => {
      fs.close(fd);
      reject(error);
    });
  })
    .then(() => {
      console.log("Routines dumped.");
    })
    .catch((error) => console.error(error));
}
