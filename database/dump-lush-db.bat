@echo off

echo This script dumps the lush database. To start executing type the directory path to save files to.

set targetDir=%cd%\dump
set /P targetDir="Directory: "

if not exist "%targetDir%" mkdir "%targetDir%"

echo Dumping all data...
mysqldump --routines lush > "%targetDir%\dump.sql"

echo Lush db dumped.

pause
