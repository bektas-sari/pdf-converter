# PDF Converter - Chrome Uzantısı 📄

SuperPDF, PDF dosyalarıyla tarayıcı üzerinden etkileşime geçmenizi sağlayan güçlü bir Chrome eklentisidir. 
PDF dosyalarını görüntüleme, düzenleme, form doldurma, e-imza ekleme, dosya dönüştürme ve yapay zekâ destekli sohbet etme gibi birçok özelliği bir arada sunar.

---

## Özellikler ✨

- PDF görüntüleyici ve yazdırma
- Metin vurgulama ve çizim ile düzenleme
- Form doldurma alanları ve verilerle kaydetme
- E-imza aracı ile PDF üzerine imza atma
- PDF'den Word, Excel, PowerPoint ve TXT'ye dönüştürme
- PDF ile yapay zeka destekli sohbet
- Minimalist, modern ve mobil uyumlu arayüz

---

## Kurulum ⚙️

1. Bu projeyi klonlayın ya da ZIP olarak indirin.
2. Chrome'da `chrome://extensions` sayfasını açın.
3. "Geliştirici Modu"nu aktif edin.
4. "Paketlenmemiş Öğeyi Yükle" seçeneğine tıklayın ve proje klasörünü seçin.

---

## Klasör Yapısı 🗂️

```
super-pdf-extension/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── popup.css
│
├── viewer/
│   ├── pdf_viewer.html / js / css
├── editor/
│   ├── pdf_editor.html / js / css
├── form/
│   ├── pdf_form.html / js / css
├── signature/
│   ├── pdf_sign.html / js / css
├── chat/
│   ├── pdf_chat.html / js / css
│
├── lib/
│   ├── pdfjs/ (pdf.min.js & worker)
│   └── fontawesome/
├── assets/
│   ├── logo ve ikonlar
```

---

## Bilinen Hatalar ⚠️

### 1. "Please open a PDF file first" Hatası
PDF dosyası açık olsa bile, URL `.pdf` ile bitmiyorsa eklenti dosyanın açık olduğunu algılayamayabilir.

### 2. PDF Görüntülenmiyor / "Failed to load PDF"
PDF verisi arka planda başarıyla iletilmediğinde bu hata alınabilir.

### 3. pdfjsLib tanımlı değil hatası
PDF.js kütüphanesi import edilmemişse veya worker yolu tanımlı değilse bu hata çıkabilir.

---

## 👤 Geliştirici

**Bektaş Sarı**<br>
PhD in Advertising, AI + Creativity researcher<br>
Flutter Developer & Software Educator<br>

- **Email:** [bektas.sari@gmail.com](mailto:bektas.sari@gmail.com)   
- **LinkedIn:** [linkedin.com/in/bektas-sari](https://www.linkedin.com/in/bektas-sari)  
- **Researchgate:** [researchgate.net/profile/Bektas-Sari-3](https://www.researchgate.net/profile/Bektas-Sari-3)  
- **Academia:** [independent.academia.edu/bektassari](https://independent.academia.edu/bektassari)

---

## Katkı 🛠️
Pull Request'ler açıktır. Yeni özellikler, hata düzenlemeleri ve stil iyileştirmeleri için katkıda bulunabilirsiniz.

---

## Lisans 📄
MIT Lisansı.

---

Keyifli kullanımlar! ✨

