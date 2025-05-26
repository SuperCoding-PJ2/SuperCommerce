import React, {useState, useEffect, useContext, useRef} from 'react';
import Layout from '../common/Layout';
import {AuthContext} from '../../context/AuthContext';
import {fetchMyPage, updateMyPage} from '../../services/myPageService';

const MyAccount = () => {
  const {logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 마이페이지 데이터
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');     // ← 추가
  const [recentOrder, setRecentOrder] = useState(null);

  // 프로필 이미지 (선택)
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyPage();
        console.log(data);
        setEmail(data.email);
        setShippingAddress(data.shippingAddress);
        setPhoneNumber(data.phoneNumber || '');           // ← 추가
        if (data.profileImageUrl) {
          setImageUrl(data.profileImageUrl);               // ← 초기 URL 세팅
        }
        setRecentOrder(data.recentOrderDto);
      } catch (err) {
        setError('내 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleImageChange = e => {
    const img = e.target.files[0];
    if (img) {
      setFile(img);
      setImageUrl(URL.createObjectURL(img));
    }
  };

  const handleUpdate = async () => {
    setError(null);
    setLoading(true);
    try {
      await updateMyPage({
        email,
        shippingAddress,
        phoneNumber,                    // ← 전달
        profileImageFile: file,
      });
      alert('내 정보가 업데이트되었습니다.');
    } catch (err) {
      setError('업데이트에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout>로딩 중…</Layout>;
  if (error) return <Layout>{error}</Layout>;

  return (
    <Layout>
      <section className="px-4 text-sm text-[#212121]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          {/* Left: Title + Logout */}
          <div className="w-[260px]">
            <h1 className="font-bold text-[28px] mb-1">My account</h1>
            <button onClick={logout} className="text-sm font-semibold">
              ← Log Out
            </button>
          </div>

          {/* Right: Info / Edit */}
          <div className="w-full space-y-6 py-8">
            <p className="text-[16px] font-bold">Hello, {email}</p>
            <hr className="border-gray-300"/>

            {/* Profile Image Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-24 h-24 rounded-full bg-gray-200 cursor-pointer overflow-hidden"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Upload
                  </div>
                )}
              </div>
            </div>

            {/* Email, Address, Phone */}
            <div className="space-y-4">
              <div>
                <p className="font-bold">Email</p>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border p-2"
                />
              </div>
              <div>
                <p className="font-bold">Shipping Address</p>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  className="w-full border p-2"
                />
              </div>
              <div>
                <p className="font-bold">Phone Number</p>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full border p-2"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="bg-black text-white px-6 py-2 text-sm font-semibold"
              disabled={loading}
            >
              {loading ? '로딩중…' : 'Update Info'}
            </button>

            <hr className="border-gray-300"/>

            {/* Recent Order */}
            {recentOrder && (
              <div>
                <p className="font-bold mb-4">Your recent order</p>
                <div className="grid grid-cols-6 items-center">
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src={recentOrder.imageUrl}
                      alt={recentOrder.productName}
                      className="w-20 h-20 object-cover bg-gray-100"
                    />
                    <p className="font-bold">{recentOrder.productName}</p>
                  </div>
                  <div>{recentOrder.color}</div>
                  <div>-</div>
                  <div>{recentOrder.quantity}</div>
                  <div>₩{recentOrder.price}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyAccount;
