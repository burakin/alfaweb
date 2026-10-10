# Alfa Teknik Isı Sistemleri – Web Sitesi

Bağımsız, statik web sitesi: `index.html` + `assets/` (CSS, JS, görseller).
Hiçbir framework, derleme adımı veya Claude bağımlılığı yoktur. Her web sunucusunda ve GitHub Pages'te çalışır.

## Klasör yapısı

```
index.html              Ana sayfa (tüm bölümler)
assets/css/style.css    Tüm stiller (responsive + prefers-reduced-motion)
assets/js/main.js       Parallax, menüler, kaydırmalı ev kesiti, sayaçlar, form
assets/img/hero/        Giriş vitrin görseli ve kategori kartları
assets/img/house/       Ev kesiti görselleri (dış cephe, kesit, ticari)
assets/img/logos/       Buderus ve Viessmann logoları
.nojekyll               GitHub Pages için (dosyaları olduğu gibi yayınlar)
```

## GitHub Pages'te yayınlama

1. GitHub'da yeni bir depo oluşturun (ör. `alfateknik-web`).
2. Bu klasörün **içindeki** tüm dosyaları deponun köküne yükleyin
   (web arayüzünde "Add file → Upload files" ile sürükleyip bırakabilirsiniz;
   `index.html` deponun en üst seviyesinde olmalı).
3. **Settings → Pages** → Source: "Deploy from a branch" → Branch: `main` / `(root)` → Save.
4. 1–2 dakika sonra site `https://KULLANICIADI.github.io/alfateknik-web/` adresinde yayında olur.

### Kendi alan adınız (www.alfateknik.com.tr)

1. Settings → Pages → **Custom domain** alanına `www.alfateknik.com.tr` yazın.
2. Alan adı yönetim panelinizde (DNS):
   - `www` için **CNAME** kaydı → `KULLANICIADI.github.io`
   - Kök alan adı (`alfateknik.com.tr`) için **A** kayıtları → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. DNS yayıldıktan sonra **Enforce HTTPS** kutusunu işaretleyin.

## Teklif formu

GitHub Pages sunucu tarafı kod çalıştırmaz, bu yüzden form bir servis üzerinden e-posta gönderir.
Şu an form doldurulunca yalnızca "Talebiniz alındı" mesajı gösteriliyor, **e-posta gitmiyor**.

Bağlamak için (ör. Formspree, ücretsiz katman yeterli):
1. formspree.io'da hesap açın, `alfa@alfateknik.com.tr` adresine bağlı bir form oluşturun.
2. Size verilen adresi `index.html` içinde formun `action` alanına yazın:
   `<form class="form" id="quote-form" action="https://formspree.io/f/XXXXXXX" method="post" ...>`
3. Hepsi bu – `main.js` formu bu adrese gönderir ve başarı mesajını gösterir.

## Yayına almadan önce doldurulacaklar

- Çalışma saatleri: `[08:30–18:00]`, `[08:30–13:00]` (üst bar, iletişim, footer)
- Fiyat listesi ve doküman kartları: güncelleme tarihleri `[GG.AA.2026]`, dosya boyutları `[X,X MB]` ve **gerçek PDF bağlantıları** (`href="#fiyat-listeleri"` / `href="#dokumanlar"` yerine `assets/pdf/...pdf`)
- Rakamlar bölümündeki sayaçlar (25, 1.500, 8.000, 120.000) **örnek değerlerdir** – `index.html` içinde `data-to="..."` değerlerini güncelleyin
- "Bayi Portal Girişi" butonları şu an sayfadaki bölüme gidiyor – gerçek portal adresiyle değiştirin
- DemirDöküm ve partner marka logoları (şu an yer tutucu)
- Fotoğraf alanları (depo, sevkiyat, kazan dairesi, şantiye) – gerçek fotoğraflarla değiştirin
- KVKK Aydınlatma Metni, Gizlilik ve Çerez Politikası sayfaları
- Teslimat süresi (SSS'de `[aynı gün / ertesi iş günü]`)
- Marka logolarının kullanımı için ilgili markaların bayi kurallarını kontrol edin

## Notlar

- Fontlar Google Fonts'tan yüklenir (Archivo, IBM Plex Sans, IBM Plex Mono).
- Ziyaretçinin cihazında "hareketi azalt" açıksa parallax ve animasyonlar kapanır, ev kesiti tek statik görsel olarak gösterilir.
- 960 px altında ev kesiti, adım adım kırpılmış görsellere dönüşür; mobilde altta Ara / WhatsApp / Fiyatlar / Dokümanlar çubuğu görünür.
# alfaweb
