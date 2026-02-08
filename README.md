# SCORM Oluşturucu Pro (SCORM Generator Pro)

FSRC tarafından sevgiyle geliştirilen, tek dosyalı web uygulamalarınızı (HTML5 oyunlar, etkileşimli içerikler vb.) SCORM 1.2 uyumlu paketlere dönüştüren profesyonel bir araçtır.

## Özellikler

*   **Profesyonel Türkçe Arayüz:** Kullanıcı dostu ve tamamen Türkçe arayüz.
*   **Kolay Kullanım:** Sadece HTML dosyanızı yükleyin ve gerekli bilgileri girin.
*   **Anlık Önizleme:** Yüklediğiniz içeriği paketlemeden önce görüntüleyin.
*   **SCORM 1.2 Uyumluluğu:** Oluşturulan paketler Moodle, Canvas, Blackboard ve MEB EBA gibi LMS sistemleriyle uyumludur.
*   **Güvenli ve Hızlı:** Tüm işlemler tarayıcınızda gerçekleşir, sunucuya dosya gönderilmez.

## Kurulum (Geliştiriciler İçin)

Proje React, TypeScript ve Vite ile geliştirilmiştir.

1.  Depoyu klonlayın:
    ```bash
    git clone https://github.com/shishcode/scorm-generator.git
    cd scorm-generator
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda `http://localhost:5173` adresini açın.

## Kullanım

1.  **İçerik Yükle:** "İçerik Yükle" alanına tıklayarak veya sürükleyip bırakarak `.html` dosyanızı yükleyin.
2.  **Yapılandırma:**
    *   **Manifest Kimliği (ID):** Paketiniz için benzersiz bir kimlik (örn. `Dersim_v1`). Türkçe karakter ve boşluk kullanmamaya özen gösterin.
    *   **Organizasyon:** Kurum veya oluşturucu adı (örn. `MEB_EBA`).
    *   **Ders Başlığı:** LMS'de görünecek ders adı.
    *   **Öğe Başlığı (SCO):** İçeriğin başlığı.
3.  **Önizleme:** "Önizle" butonuna basarak içeriğin doğru çalıştığından emin olun.
4.  **Oluştur:** "SCORM Oluştur" butonuna tıklayarak `.zip` dosyasını indirin.
5.  **Yükleme:** İndirilen ZIP dosyasını LMS sisteminize (örn. EBA) SCORM paketi olarak yükleyin.

## Dağıtım (Deployment)

Bu proje [Render.com](https://render.com) üzerinde Statik Site olarak çalışmaya hazırdır.

*   **Build Command:** `npm install && npm run build`
*   **Publish Directory:** `dist`

## Teknolojiler

*   [React](https://react.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [JSZip](https://stuk.github.io/jszip/)
*   [Lucide React](https://lucide.dev/)

---
Created with love by FSRC
