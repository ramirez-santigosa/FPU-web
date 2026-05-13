@echo off
REM ============================================================================
REM actualizar.bat - Sube los cambios actuales al repo de GitHub
REM Para iteraciones posteriores a la publicacion inicial.
REM Uso: doble clic, o desde CMD ya en esta carpeta:  actualizar.bat
REM ============================================================================

setlocal
cd /d "%~dp0"

echo.
echo === Actualizar Web FPU 2026 en GitHub ===
echo Carpeta: %CD%
echo.

REM ----- Comprobaciones ---------------------------------------------------------
where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] git no esta instalado o no esta en el PATH.
  goto :fin
)
if not exist .git (
  echo [ERROR] No hay repositorio git en esta carpeta.
  echo Si todavia no has publicado nunca, ejecuta primero publicar.bat
  goto :fin
)

REM ----- 1) Sincronizar CSS y JS embebidos en HTML -----------------------------
echo === [1/3] Sincronizando CSS y JS embebidos (sync-assets.py) ===
where python >nul 2>nul
if errorlevel 1 (
  echo   [AVISO] python no esta en el PATH; salto la sincronizacion.
  echo   Si has editado assets/styles.css o assets/app.js, los HTML pueden
  echo   estar desactualizados. Instala Python desde https://python.org
) else (
  python scripts\sync-assets.py
  if errorlevel 1 (
    echo   [AVISO] sync-assets.py fallo, continuo igualmente.
  )
)

REM ----- 2) Anadir cambios y commit --------------------------------------------
echo.
echo === [2/3] Anadiendo cambios y haciendo commit ===
git add -A

git diff --cached --quiet
if errorlevel 1 (
  git commit -m "Actualizacion %DATE% %TIME%"
  if errorlevel 1 goto :error
  echo   Commit realizado.
) else (
  echo   No hay cambios nuevos para commitear.
  echo   (Aun asi se intentara push por si quedan commits locales sin subir.)
)

REM ----- 3) Push ---------------------------------------------------------------
echo.
echo === [3/3] Subiendo a GitHub ===
git push
if errorlevel 1 goto :error

REM ----- Final OK --------------------------------------------------------------
cls
echo.
echo ##############################################################
echo #                                                            #
echo #            ACTUALIZACION SUBIDA A GITHUB                   #
echo #                                                            #
echo ##############################################################
echo.
echo   Repositorio:  https://github.com/ramirez-santigosa/FPU-web
echo   Web (Pages):  https://ramirez-santigosa.github.io/FPU-web/
echo.
echo   Comprueba en GitHub que ves el nuevo commit en la pestana
echo   "Commits" del repositorio.
echo.
echo   GitHub Pages tardara 30-60 segundos en mostrar los cambios.
echo.
echo   Pulsa cualquier tecla para cerrar esta ventana.
echo.
pause >nul
exit /b 0

:error
echo.
echo ##############################################################
echo #                ERROR EN LA ACTUALIZACION                   #
echo ##############################################################
echo.
echo Revisa el mensaje de arriba. Posibles causas:
echo   - Necesitas autenticarte (se abrira el navegador).
echo   - Conflictos con la version remota; prueba:
echo         git pull --rebase
echo         git push
echo.
pause >nul
exit /b 1

:fin
pause >nul
endlocal
