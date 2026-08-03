$src = "C:\Users\TA\.gemini\antigravity-ide\brain\5a399928-50e7-41f2-8880-51c2ae3841fb"
$dst = "c:\Users\TA\Desktop\Nouveau dossier (6)\images"

$files = @{
    "hero_hotel_1785765847685.png" = "hero.png"
    "room_suite_1785765857923.png" = "suite.png"
    "room_deluxe_1785765867745.png" = "deluxe.png"
    "room_prestige_1785765888640.png" = "prestige.png"
    "restaurant_hotel_1785765898342.png" = "restaurant.png"
    "spa_hotel_1785765906882.png" = "spa.png"
    "pool_hotel_1785765924466.png" = "pool.png"
    "event_hall_1785765934312.png" = "event.png"
    "gallery_lobby_1785765946142.png" = "lobby.png"
}

foreach ($item in $files.GetEnumerator()) {
    $source = Join-Path $src $item.Key
    $destination = Join-Path $dst $item.Value
    if (Test-Path $source) {
        [System.IO.File]::Copy($source, $destination, $true)
        Write-Host "OK: $($item.Value)"
    } else {
        Write-Host "MISSING: $($item.Key)"
    }
}
Write-Host "Done!"
