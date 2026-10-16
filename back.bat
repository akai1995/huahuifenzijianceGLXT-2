@echo off
rem 一键 git 备份：双击运行，把当前所有文件改动提交到本地仓库
cd /d "%~dp0"
set GIT="E:\LKS文件\软件安装\Git\Git\cmd\git.exe"
%GIT% add -A
%GIT% commit -m "backup %date% %time%"
echo.
echo ===== 最近 5 次备份 =====
%GIT% log --oneline -5
echo.
pause