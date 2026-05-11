@echo off
REM ============================================================================
REM publicar.bat - Publica la maqueta FPU 2026 en GitHub
REM Repo destino: https://github.com/ramirez-santigosa/FPU-web
REM Uso: doble clic, o desde CMD ya en esta carpeta:  publicar.bat
REM ============================================================================

setlocal
cd /d "%~dp0"

echo.
echo === Web FPU 2026 - Publicacion en GitHub ===
echo Carpeta: %CD%
echo Repo:    https://github.com/ramirez-santigosa/FPU-web
echo.

REM ----- Comprobaciones previas ------------------------------------------------
where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] git no esta instalado o no esta en el PATH.
  echo Instala Git desde https://git-scm.com/ y vuelve a intentarlo.
  goto :fin
)

REM ----- 1) Limpiar .git previo si existe --------------------------------------
echo === [1/5] Limpiando .git previo si existe ===
if exist .git (
  rmdir /s /q .git
  echo   .git eliminado.
) else (
  echo   No habia .git previo.
)

REM ----- 2) Inicializar repositorio -------------------------------------------
echo.
echo === [2/5] Inicializando repositorio ===
git init -b main
if errorlevel 1 goto :error
git config user.email "lourdes.ramirez@aei.gob.es"
git config user.name "Lourdes Ramirez"

REM ----- 3) Primer commit ------------------------------------------------------
echo.
echo === [3/5] Anadiendo archivos y haciendo commit ===
git add .
if errorlevel 1 goto :error
git commit -m "v0.1 - Maqueta inicial Web Convocatoria FPU 2026"
if errorlevel 1 goto :error

REM ----- 4) Configurar remote --------------------------------------------------
echo.
echo === [4/5] Configurando remote origin ===
git remote add origin https://github.com/ramirez-santigosa/FPU-web.git
if errorlevel 1 (
  echo   El remote ya existia, actualizando URL...
  git remote set-url origin https://github.com/ramirez-santigosa/FPU-web.git
)
git branch -M main

REM ----- 5) Push ---------------------------------------------------------------
echo.
echo === [5/5] Subiendo a GitHub (push) ===
echo Si te pide autenticacion, se abrira el navegador.
echo.
git push -u origin main
if errorlevel 1 (
  echo.
  echo [ERROR] Fallo el push. Posibles causas:
  echo   - Necesitas autenticarte (deberia haberse abierto el navegador).
  echo   - El repo remoto ya tiene commits (README inicial). Si es asi, ejecuta:
  echo         git pull origin main --allow-unrelated-histories
  echo         git push -u origin main
  goto :error
)

REM ----- Final OK --------------------------------------------------------------
cls
echo.
echo ##############################################################
echo #                                                            #
echo #            PUBLICACION COMPLETADA CORRECTAMENTE            #
echo #                                                            #
echo ##############################################################
echo.
echo   Repositorio:
echo     https://github.com/ramirez-santigosa/FPU-web
echo.
echo   Comprueba arriba que ves los HTML y el commit
echo   "v0.1 - Maqueta inicial Web Convocatoria FPU 2026"
echo.
echo   --------------------------------------------------------
echo   SIGUIENTE PASO: activar GitHub Pages
echo   --------------------------------------------------------
echo     1. Abre el repo en el navegador.
echo     2. Pestana "Settings" (arriba a la derecha).
echo     3. Menu izquierdo - "Pages".
echo     4. Source: Deploy from a branch.
echo     5. Branch: main / Folder: / (root) - boton "Save".
echo     6. Espera 1-2 min y entra en:
echo          https://ramirez-santigosa.github.io/FPU-web/
echo.
echo   --------------------------------------------------------
echo   Pulsa cualquier tecla para cerrar esta ventana.
echo   --------------------------------------------------------
echo.
pause >nul
exit /b 0

:error
echo.
echo ##############################################################
echo #                                                            #
echo #              ERROR EN LA PUBLICACION                       #
echo #                                                            #
echo ##############################################################
echo.
echo Revisa el mensaje de error de arriba.
echo Copia el texto y mandaselo a Claude para diagnosticar.
echo.
echo Pulsa cualquier tecla para cerrar esta ventana.
pause >nul
exit /b 1

:fin
endlocal
