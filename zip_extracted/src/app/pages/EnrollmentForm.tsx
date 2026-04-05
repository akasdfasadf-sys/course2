import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { CheckCircle, AlertCircle, CreditCard, Banknote, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';

export function EnrollmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enrollCourse } = useAuth();
  const course = courses.find((c) => c.id === id);

  const [formData, setFormData] = useState({
    employmentStatus: '',
    learningGoal: '',
    discountType: '0' as '0' | '15' | '30',
    paymentMethod: 'card' as 'card' | 'cash' | 'bank',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!course) {
    return <div>Kurs tapylmady</div>;
  }

  const getPriceByDiscount = () => {
    switch (formData.discountType) {
      case '15':
        return course.price15;
      case '30':
        return course.price30;
      default:
        return course.basePrice;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save enrollment
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push({
      userId: user?.id,
      courseId: course.id,
      ...formData,
      enrolledDate: new Date().toISOString(),
      price: getPriceByDiscount(),
    });
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    // Add course to user's enrolled courses
    enrollCourse(course.id);
    
    setSubmitted(true);
    setTimeout(() => {
      navigate(`/course/${course.id}/learn`);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Üstünlik!</h2>
          <p className="text-gray-600 mb-4">
            Siz "{course.titleTm}" kursyna üstünlikli ýazylдыňyz.
          </p>
          <p className="text-sm text-gray-500">
            Kursa geçirilýär...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to={`/course/${course.id}`} className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Kursa dolan
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kursa ýazylmak</h1>
          <p className="text-gray-600">{course.titleTm}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Şahsy maglumatlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ady
                    </label>
                    <input
                      type="text"
                      value={user?.firstName}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Familiýasy
                    </label>
                    <input
                      type="text"
                      value={user?.lastName}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-poçta
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={user?.phone}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Goşmaça maglumatlar
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Iş ýagdaýy
                    </label>
                    <select
                      required
                      value={formData.employmentStatus}
                      onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Saýlaň</option>
                      <option value="student">Okuwçy</option>
                      <option value="employed">Işleýän</option>
                      <option value="unemployed">Işsiz</option>
                      <option value="self-employed">Öz işi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bu kursy näme üçin almak isleýärsiňiz?
                    </label>
                    <textarea
                      required
                      value={formData.learningGoal}
                      onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Maksadyňyzy düşündiriň..."
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Arzanladyş saýlaň
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="discount"
                        value="0"
                        checked={formData.discountType === '0'}
                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value as '0' | '15' | '30' })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="font-medium text-gray-900">Arzanladyşsyz</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{course.basePrice} TMT</span>
                  </label>

                  <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="discount"
                        value="15"
                        checked={formData.discountType === '15'}
                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value as '0' | '15' | '30' })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <span className="font-medium text-gray-900">15% arzanladyş</span>
                        <p className="text-sm text-gray-600">İki aýda tölemek</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{course.price15} TMT</span>
                  </label>

                  <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="discount"
                        value="30"
                        checked={formData.discountType === '30'}
                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value as '0' | '15' | '30' })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <span className="font-medium text-gray-900">30% arzanladyş</span>
                        <p className="text-sm text-gray-600">Doly tölemek</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-green-600">{course.price30} TMT</span>
                  </label>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Töleg usuly
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Kart bilen</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Banknote className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Nagt</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Bank geçirimi</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Ýazylmany tamamla
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Jemi</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kurs:</span>
                  <span className="font-medium">{course.titleTm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dowamlylygy:</span>
                  <span className="font-medium">{course.weeks} hepde</span>
                </div>
                {formData.discountType !== '0' && (
                  <div className="flex justify-between text-green-600">
                    <span>Arzanladyş:</span>
                    <span className="font-medium">{formData.discountType}%</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Jemi töleg:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {getPriceByDiscount()} TMT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
