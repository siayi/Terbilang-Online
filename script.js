function convertNumber() {
    const input = document.getElementById('numberInput').value;
    const number = parseInt(input.replace(/\./g, ''), 10);
    if (!isNaN(number)) {
        const hasil = angkaKeKata(number);
        document.getElementById('result').textContent = 'Hasil: ' + hasil;
        document.getElementById('copyButton').style.display = 'inline'; // Tampilkan tombol copy
    } else {
        document.getElementById('result').textContent = 'Hasil: Input tidak valid';
        document.getElementById('copyButton').style.display = 'none'; // Sembunyikan tombol copy
    }
}

function formatNumber() {
    let input = document.getElementById('numberInput').value;
    input = input.replace(/\D/g, ''); // Menghapus karakter non-digit
    if (input) {
        input = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Format ribuan dengan titik
    }
    document.getElementById('numberInput').value = input;
}

function copyResult() {
    const resultText = document.getElementById('result').textContent.replace('Hasil: ', '');
    navigator.clipboard.writeText(resultText).then(function() {
        alert('Hasil berhasil disalin ke clipboard!');
    }, function(err) {
        alert('Gagal menyalin teks: ', err);
    });
}

function angkaKeKata(angka) {
    if (angka === 0) return "nol";
    if (isNaN(angka) || angka < 0) return "Input tidak valid";
    if (angka === 1000) return "seribu";

    const ribuan = ["", "ribu", "juta", "miliar", "triliun", "kuadriliun"];
    
    let result = '';
    let unitIndex = 0;

    while (angka > 0) {
        let chunk = angka % 1000;
        if (chunk !== 0) {
            let chunkResult = chunkToWords(chunk);
            if (unitIndex === 1) {
                if (chunk === 1) {
                    chunkResult = "seribu";
                } else if (chunk < 10) {
                    chunkResult = chunkToWords(chunk) + " ribu";
                } else {
                    chunkResult += " ribu";
                }
            } else if (unitIndex > 0) {
                chunkResult += " " + ribuan[unitIndex];
            }
            result = chunkResult + (result ? " " + result : "");
        }
        angka = Math.floor(angka / 1000);
        unitIndex++;
    }
    
    return result.trim();
}

function chunkToWords(chunk) {
    const satuan = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
    const belasan = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];
    const puluhan = ["", "sepuluh", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
    
    let words = '';

    if (chunk >= 100) {
        words += (chunk === 100 ? "seratus" : 
                  chunk < 200 ? "seratus " : 
                  satuan[Math.floor(chunk / 100)] + " ratus ");
        chunk %= 100;
    }
    if (chunk >= 20) {
        words += puluhan[Math.floor(chunk / 10)] + " ";
        chunk %= 10;
    } else if (chunk >= 10) {
        return words + belasan[chunk - 10];
    }
    if (chunk > 0) {
        words += satuan[chunk];
    }

    return words.trim();
}