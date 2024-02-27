# PokePedia

Sebuah aplikasi web pencarian pokemon yang menggukanan API milik https://pokeapi.co/

### Fitur

- **Home** :
  Terdapat daftar seluruh pokemon dengan fitur pencarian pokemon berdasarkan nama pokemon dan memfilter berdasarkan tipe pokemon. Untuk fitur pencarian berdasarkan nama, karena API yang digunakan tidak menyediakan search params berdasarkan nama, seluruh pokemon di-fetch dan di-filter di client side, kontranya akan memakan load time lebih lama saat pertama kali.

- **Detail** : Halaman untuk melihat detail dari pokemon yang dipilih dari Home. Ditampilkan Profil dasar pokemon, stats, dan evolusinya.
