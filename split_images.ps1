Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\LENOVO\.gemini\antigravity-ide\brain\cb292d8a-b1e6-4909-9dd5-6928fc346b0a\.user_uploaded\media_1790520672104.jpg"
$destDir = "d:\raman_portfolio\assets"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

$srcImage = [System.Drawing.Image]::FromFile($sourcePath)
$totalWidth = $srcImage.Width
$totalHeight = $srcImage.Height

$panels = @(
    @{ Name = "acting.jpg"; PortraitName = "acting_portrait.jpg"; X = 0; W = 205 },
    @{ Name = "anchor.jpg"; PortraitName = "anchor_portrait.jpg"; X = 205; W = 205 },
    @{ Name = "entertainer.jpg"; PortraitName = "entertainer_portrait.jpg"; X = 410; W = 205 },
    @{ Name = "public_speaking.jpg"; PortraitName = "public_speaking_portrait.jpg"; X = 615; W = 204 },
    @{ Name = "creative_expression.jpg"; PortraitName = "creative_expression_portrait.jpg"; X = 819; W = 205 }
)

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

foreach ($panel in $panels) {
    $x = $panel.X
    $w = $panel.W
    $h = $totalHeight

    if ($x + $w -gt $totalWidth) {
        $w = $totalWidth - $x
    }

    # 1. Full panel (with badge/title)
    $rect = New-Object System.Drawing.Rectangle($x, 0, $w, $h)
    $cropped = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($srcImage, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $outPath = Join-Path $destDir $panel.Name
    $cropped.Save($outPath, $jpegEncoder, $encoderParams)
    $cropped.Dispose()

    # 2. Pure photo crop (top 80% to focus on Raman's portrait / pose)
    $portraitHeight = [int]($totalHeight * 0.78)
    $rectPortrait = New-Object System.Drawing.Rectangle($x, 0, $w, $portraitHeight)
    $croppedPortrait = New-Object System.Drawing.Bitmap($w, $portraitHeight)
    $gp = [System.Drawing.Graphics]::FromImage($croppedPortrait)
    $gp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gp.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gp.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gp.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $destRectPortrait = New-Object System.Drawing.Rectangle(0, 0, $w, $portraitHeight)
    $gp.DrawImage($srcImage, $destRectPortrait, $rectPortrait, [System.Drawing.GraphicsUnit]::Pixel)
    $gp.Dispose()

    $portraitPath = Join-Path $destDir $panel.PortraitName
    $croppedPortrait.Save($portraitPath, $jpegEncoder, $encoderParams)
    $croppedPortrait.Dispose()

    Write-Host "Generated $($panel.Name) and $($panel.PortraitName)"
}

Copy-Item -Path $sourcePath -Destination (Join-Path $destDir "raman_personas_collage.jpg") -Force
$srcImage.Dispose()
Write-Host "Extraction complete!"
