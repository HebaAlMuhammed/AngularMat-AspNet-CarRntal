using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebCar.Models;
using WebCar.ViewModel;
using System.Web.Http.Cors;
using System.IO;
using System.Drawing;

namespace WebCar.Controllers
{
  [Authorize]

   
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public class ServerController : ApiController
    {
        WebCarDBEntities db = new WebCarDBEntities();
        SonucModel sonuc = new SonucModel();
       

        #region Kategori
        [HttpGet]
        [Route("api/kategoriliste")]
        public List<CategoryModel> KategoriListe()
        {
            List<CategoryModel> liste = db.Category.Select(x => new CategoryModel()
            {
                CategoryId = x.CategoryId,
                CategoryName = x.CategoryName,
                CarCategoryCount = x.Car.Count()
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/categorybyid/{CategoryId}")]
        public CategoryModel CategoryById(int CategoryId)
        {
            CategoryModel kayit = db.Category.Where(s => s.CategoryId == CategoryId).Select(x =>
            new CategoryModel()
            {
                CategoryId = x.CategoryId,
                CategoryName = x.CategoryName,
                CarCategoryCount = x.Car.Count()
            }).FirstOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(CategoryModel model)
        {
            if (db.Category.Count(s => s
            .CategoryName == model.CategoryName) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!";
                return sonuc;
            }
            Category yeni = new Category();
            yeni.CategoryName = model.CategoryName;
            db.Category.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(CategoryModel model)
        {
            Category kayit = db.Category.Where(s => s
            .CategoryId == model.CategoryId)
            .FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            
            
            kayit.CategoryName = model.CategoryName;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }


        [HttpDelete]
        [Route("api/kategorisil/{CategoryId}")]
        public SonucModel KategoriSil(int CategoryId)
        {
            Category kayit = db.Category.Where(s => s.CategoryId == CategoryId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Car.Count(s => s.CategoryId == CategoryId) > 0) //kategori üzerinde araba vareken kategori silinmaz

            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Ürün Kaydı Olan Kategori Silinemez!";
                return sonuc;
            }
            db.Category.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }


        #endregion






        #region Araba
        [HttpGet]
        [Route("api/arabaliste")]
        public List<CarModel> ArabaListe()
        {
            List<CarModel> liste = db
            .Car.Select(x => new
            CarModel()
            {
                CarId = x.CarId,
                Brand = x.Brand,
                Model = x.Model,
                Description = x.Description,
                CarNo = x.CarNo,
                Photo = x.Photo,
                Cost = x.Cost,
                CategoryName = x.Category.CategoryName,
                CategoryId = x.CategoryId,
                // UserUName=x.User.UserUName,

                Date = x.Date,
                Ranted = true
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/arababyid/{CarId}")]
        public CarModel CarById(int CarId)
        {
            CarModel kayit = db.Car.Where(s => s.CarId == CarId
            ).Select(x => new
            CarModel()
            {

                CarId = x.CarId,
                Brand = x.Brand,
                Model = x.Model,
                Description = x.Description,
                CarNo = x.CarNo,
                Photo = x.Photo,
                Cost = x.Cost,
                CategoryName = x.Category.CategoryName,
                CategoryId = x.CategoryId,
                // UserUName=x.User.UserUName,

                Date = x.Date,
                Ranted = true
            })
            .FirstOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/arabalistebykatid/{CatId}")]
        public List<CarModel> ArabaListeByKatId(int CatId)
        {
            List<CarModel> liste = db.Car.Where(s => s.CategoryId == CatId).Select(x =>
            new CarModel()
            {
                CarId = x.CarId,
                Brand = x.Brand,
                Model = x.Model,
                Description = x.Description,
                CarNo = x.CarNo,
                Photo = x.Photo,
                Cost = x.Cost,
                CategoryName = x.Category.CategoryName,
                CategoryId = x.CategoryId, 
                Date = x.Date,
                Ranted = true
            }).ToList();
            return liste;
        }

        [HttpPost]
        [Route("api/arabaekle")]
        public SonucModel ArabaEkle(CarModel model)
        {
            if (db.Car.Count(s => s.CarNo == model.CarNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girelen Araba Numarası Kayıtlıdır";
                return sonuc;
            }
            Car yeni = new Car();

            yeni.Brand = model.Brand;
            yeni.Model = model.Model;
            yeni.Cost = model.Cost;
            yeni.Photo = model.Photo;
            yeni.CarNo = model.CarNo;
            yeni.CategoryId = model.CategoryId;
            yeni.UserId = model.UserId;
            yeni.Date = model.Date;
          
            yeni.Ranted = true;
            db.Car.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araba Eklendi ";
            return sonuc;





        }

        [HttpPut]
        [Route("api/arabaduzenle")]
        public SonucModel ArabaDuzenle(CarModel model)
        {
            Car kayit = db.Car.Where(s => s.CarId ==
            model.CarId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı";
                return sonuc;
            }
            kayit.CarNo = model.CarNo;
            kayit.Model = model.Model;
            kayit.Brand = model.Brand;
            kayit.Cost = model.Cost;
            kayit.Photo = model.Photo;
            kayit.CategoryId = model.CategoryId;
            kayit.Ranted = model.Ranted;

            db.SaveChanges();
            sonuc.mesaj = "Arabanın bilgileri Duzenlendi";
            sonuc.islem = true;
            return sonuc;
        }

        [HttpDelete]
        [Route("api/arabasil/{CarId}")]
        public SonucModel ArabaSil(int CarId)
        {
            Car kayit = db.Car.Where(s => s.CarId == CarId).
            SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "KayıtBulunamadı!";
                return sonuc;
            }
            if (db.Rental.Count(s => s.CarId == CarId) > 0)  //Araba kirlama oldukca araba silenmez
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba Kiralandı işlem yapılmaz!";
                return sonuc;
            }
            db.Car.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araba Silindi";
            return sonuc;
        }

        [HttpPost]
        [Route("api/arabphotoguncelle")]
        public SonucModel ArabaFotoGuncelle(FotoModel model)
        {
            SonucModel sonuc = new SonucModel(); // SonucModel nesnesini oluşturun

          //  Car car = db.Car.SingleOrDefault(s => s.CarId == model.CarId);
            Car car = db.Car.Where(s => s.CarId == model.CarId).SingleOrDefault();
            if (car == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }

            if (car.Photo != "car.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/dosyalar/" + car.Photo);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.PhotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgBytes = Convert.FromBase64String(base64);
            string dosyaAdi = car.CarId + model.PhotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgBytes, 0, imgBytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/dosyalar/" + car.Photo));
            }
            
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotograf Güncellendi";
        
            return sonuc;
        }


        #endregion


        #region User
        [HttpGet]
        [Route("api/userliste")]
        public List<UserModel> UserListe()
        {
            List<UserModel> liste = db.User.Select(x => new UserModel()
            {
                UserId = x.UserId,
                NameSurname = x.NameSurname,
                UserName = x.UserName,
                Mail = x.Mail,
                Tel = x.Tel,
                Photo = x.Photo,
                Password = x.Password,
                UserAdmin = x.UserAdmin
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/userbyid/{UserId}")]
        public UserModel UserById(int UserId)
        {
            UserModel kayit = db.User.Where(s => s.UserId == UserId).Select(x => new
            UserModel()
            {
                UserId = x.UserId,
                NameSurname = x.NameSurname,
                UserName = x.UserName,
                Mail = x.Mail,
                Tel = x.Tel,
                Photo = x.Photo,
                Password = x.Password,
                UserAdmin = x.UserAdmin
            }).FirstOrDefault();
            return kayit;
        }



        [HttpPost]
        [Route("api/userekle")]
        public SonucModel UserEkle(UserModel model)
        {
            if (db.User.Count(s => s.Tel == model.Tel) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = " Girelen User Telefon numarası kayıtlıdır";
                return sonuc;
            }
            User yeni = new User();

            yeni.NameSurname = model.NameSurname;
            yeni.UserName = model.UserName;
            yeni.Mail = model.Mail;
            yeni.Tel = model.Tel;
            yeni.Photo = model.Photo;
            yeni.Password = model.Password;
            yeni.UserAdmin = model.UserAdmin;
            db.User.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "İşlem Başarlı ";
            return sonuc;
        }


        [HttpDelete]
        [Route("api/usersil/{UserId}")]
        public SonucModel UserSil(int UserId)
        {
            User kayit = db.User.Where(s => s.UserId == UserId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunmadı";
                return sonuc;
            }
            if (db.Rental.Count(s => s.UserId == UserId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "User üzerind Araba kayıt deavm ettiği için işlem yaplımaz";
                return sonuc;
            }
            db.User.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "İşlem Başarlı";
            return sonuc;
        }

        [HttpPut]
        [Route("api/userduzenle")]
        public SonucModel UserDuzenle(UserModel model)
        {
            User kayit = db.User.Where(s => s.UserId ==
            model.UserId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı";
                return sonuc;
            }

            kayit.NameSurname = model.NameSurname;
            kayit.UserName = model.UserName;
            kayit.Mail = model.Mail;
            kayit.Tel = model.Tel;
            kayit.Photo = model.Photo;
            kayit.Password = model.Password;
            kayit.UserAdmin = model.UserAdmin;





            db.SaveChanges();
            sonuc.mesaj = "Uyenın bilgileri Duzenlendi";
            sonuc.islem = true;
            return sonuc;
        }




        #endregion


        #region Kiralama

        [HttpGet]
        [Route("api/userarabaliste/{UserId}")]
        // Kullanıcının Id'na bağlı kiralama kayıtlarını getir
        public List<RentalModel> UserArabaListe(int UserId)
        {
            List<RentalModel> liste = db.Rental.Where(s => s.UserId == UserId).Select(x => new RentalModel()
            {
                RentalId = x.RentalId,
                CarId = x.CarId,
                UserId = x.UserId,
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.UserAbout = UserById(kayit.UserId);
                kayit.CarAbout = CarById(kayit.CarId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/arabauserliste/{CarId}")]
        // Arabanın Id'na bağlı kiralama kayıtlarını getir
        public List<RentalModel> ArabaUserListe(int CarId)
        {
            List<RentalModel> liste = db.Rental.Where(s => s.CarId == CarId).Select(x => new RentalModel()
            {
                RentalId = x.RentalId,
                UserId = x.UserId,
                CarId = x.CarId,
                RentalDate = x.RentalDate,
                ReturnDate = x.ReturnDate
            }).ToList();



            return liste;
        }



        [HttpPost]
        [Route("api/arabakirala")]
        public SonucModel ArabaKirala(RentalModel model)
        {
            SonucModel sonuc = new SonucModel();
            Car car = db.Car.Find(model.CarId);

            if (car == null) // Araba bilgileri yanlışsa 
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba bulunamadı!";
                return sonuc;
            }

            if (car.Ranted == false)  //zaten kiralanmışsa 
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba zaten kiralandı!";
                return sonuc;
            }

            if (db.Rental.Any(s => s.CarId == model.CarId && s.UserId == model.UserId)) // Araba Kiralaması varsa işlem yapılamaz
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba zaten kiralandı!";
                return sonuc;
            }

            if (model.ReturnDate > model.RentalDate)
            {
                Rental yeni = new Rental();

                yeni.CarId = model.CarId;
                yeni.UserId = model.UserId;
                yeni.RentalDate = model.RentalDate;
                yeni.ReturnDate = model.ReturnDate;

                car.Ranted = true;
                db.Rental.Add(yeni);
                db.Entry(car).State = EntityState.Modified;
                db.SaveChanges();

                sonuc.islem = true;
                sonuc.mesaj = "Araba kiralandı!";
                return sonuc;
            }

            sonuc.islem = false;
            sonuc.mesaj = "Kiralama tarihi teslim tarihinden önce olmalıdır!";
            return sonuc;
        }

        [HttpPost]
        [Route("api/arabateslim/{RentalId}")]
        public SonucModel ArabaTeslim(int RentalId)
        {
            SonucModel sonuc = new SonucModel();
            Rental rental = db.Rental.FirstOrDefault(k => k.RentalId == RentalId);

            if (rental == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kiralama kaydı bulunamadı!";
                return sonuc;
            }

            Car car = db.Car.Find(rental.CarId);
            if (car == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araba kaydı bulunamadı!";
                return sonuc;
            }

            if (rental.ReturnDate > DateTime.Now)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Teslim tarihi henüz gelmemiş!";
                return sonuc;
            }

            rental.ReturnDate = DateTime.Now;

            car.Ranted = false; // Arabanın teslim edildiğinde durumunu değiştiriyoruz.
            db.Entry(car).State = EntityState.Modified;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Araba teslim edildi!";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{RentalId}")]
        public SonucModel KayitSil(int RentalId)
        {
            Rental rental = db.Rental.SingleOrDefault(s => s.RentalId == RentalId);

            if (rental == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı!";
            }
            else
            {
                db.Rental.Remove(rental);
                db.SaveChanges();

                sonuc.islem = true;
                sonuc.mesaj = "Araba Kaydı Silindi";
            }

            return sonuc;
        }
        [HttpGet]
        [Route("api/bugunteslimolanarabalar/{s}")]
        public List<Car> BugunTeslimOlanArabalar(int s)
        {
            DateTime today = DateTime.Today;

            List<Car> arabalar = db.Car
                .Where(c => c.Rental.Any(r => r.ReturnDate == today))
                .ToList();

            return arabalar;
        }

        #endregion

    }
}
