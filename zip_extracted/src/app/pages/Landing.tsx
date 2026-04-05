import { Link } from 'react-router';
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Türkmenistanyň iň öňdebaryjy onlaýn okuw platformasy</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Geljekiňizi häzir
              <br />
              <span className="text-blue-200">Döretmäge Başlaň</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              22 sany hünär kurslary arkaly täze başarnyklary öwreniň.
              <br />
              Hünärmenlerden onlaýn okuw we resmi sertifikat alyň.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Hasaba alyň
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-blue-500/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-500/40 transition-all"
              >
                Giriş
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">22</p>
              <p className="text-gray-600">Hünär kurslary</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">5000+</p>
              <p className="text-gray-600">Aktiwçi okuwçylar</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">95%</p>
              <p className="text-gray-600">Üstünlik derejesi</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">24/7</p>
              <p className="text-gray-600">Elýeterli okuw</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Näme üçin bizi saýlamaly?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Häzirki zaman okuw usullary we tejribeli mugallymlar bilen bilim alyň
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hünärmen mugallymlar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tejribeli we bilimli mugallymlardan sapak alyň. Her mugallym öz ugrunda hünärmendir.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Amaly tejribe
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nazaryýet bilen bir hatarda amaly meşgullenmeler we taslamalar arkaly öwreniň.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Resmi sertifikat
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Kursy üstünlikli tamamlanyňyzdan soň resmi ykrar edilen sertifikat alyň.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kurs kategoriýalary
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dürli ugurlarda hünär kurslaryndan saýlaň
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Programirlemek', count: 11, icon: '💻', color: 'blue' },
              { name: 'Daşary ýurt dilleri', count: 5, icon: '🗣️', color: 'green' },
              { name: 'Ylymlar', count: 3, icon: '🔬', color: 'purple' },
              { name: 'Matematika', count: 1, icon: '🔢', color: 'orange' },
              { name: 'Mugallymçylyk', count: 1, icon: '👨‍🏫', color: 'red' },
              { name: 'Kompýuter endikleri', count: 1, icon: '🖥️', color: 'indigo' },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.count} kurs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bilim syýahatyňyzy häzir başlaň!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Mugt hasaba alnyň we 22 sany hünär kursyna giriň
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Mugt hasaba alyň
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-semibold text-white">Bilim Merkezi</span>
            </div>
            <p className="text-gray-400">
              © 2026 Bilim Merkezi. Ähli hukuklar goragly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
