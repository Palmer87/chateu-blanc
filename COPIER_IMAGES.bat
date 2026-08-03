@echo off
echo Copie des images...

set SRC=C:\Users\TA\.gemini\antigravity-ide\brain\5a399928-50e7-41f2-8880-51c2ae3841fb
set DST=c:\Users\TA\Desktop\Nouveau dossier (6)\images

copy "%SRC%\hero_hotel_1785765847685.png" "%DST%\hero.png"
copy "%SRC%\room_suite_1785765857923.png" "%DST%\suite.png"
copy "%SRC%\room_deluxe_1785765867745.png" "%DST%\deluxe.png"
copy "%SRC%\room_prestige_1785765888640.png" "%DST%\prestige.png"
copy "%SRC%\restaurant_hotel_1785765898342.png" "%DST%\restaurant.png"
copy "%SRC%\spa_hotel_1785765906882.png" "%DST%\spa.png"
copy "%SRC%\pool_hotel_1785765924466.png" "%DST%\pool.png"
copy "%SRC%\event_hall_1785765934312.png" "%DST%\event.png"
copy "%SRC%\gallery_lobby_1785765946142.png" "%DST%\lobby.png"

echo.
echo Terminé ! Toutes les images ont été copiées.
pause
