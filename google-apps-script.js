/**
 * CARA PAKAI
 * ===========================================================
 * 1. Buat Google Sheet baru (kosong), beri nama misal "Hasil Ujian".
 *    Di baris 1, buat header kolom:
 *    Timestamp | Nama | NIM | Kelas | Skor | Total | Jawaban
 *
 * 2. Di Sheet itu, buka menu: Extensions > Apps Script
 *
 * 3. Hapus semua kode default di editor, lalu paste SELURUH isi
 *    file ini ke sana. Simpan (Ctrl+S / Cmd+S).
 *
 * 4. Klik tombol "Deploy" (kanan atas) > "New deployment"
 *    - Klik ikon gear di sebelah "Select type" > pilih "Web app"
 *    - Description: bebas, misal "Quiz Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"   <-- WAJIB "Anyone", bukan "Anyone with Google account"
 *    - Klik "Deploy"
 *    - Google akan minta izin akses (Authorize access) — izinkan.
 *
 * 5. Setelah deploy, kamu akan dapat URL seperti:
 *    https://script.google.com/macros/s/XXXXXXXXXXXX/exec
 *    Copy URL itu, lalu paste ke variabel SHEET_WEBHOOK_URL
 *    di file index.html.
 *
 * 6. Setiap kali kamu EDIT ulang script ini, kamu harus bikin
 *    deployment baru lagi (Deploy > Manage deployments > Edit > New version)
 *    supaya perubahan berlaku di URL yang sama.
 * ===========================================================
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.nim || "",
    data.kelas || "",
    data.score,
    data.total,
    data.answers || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
