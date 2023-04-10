import { proxy } from 'valtio';

const getPage = () => {
  const pages = window.location.href.split('/')
  return pages.pop();
};

const state = proxy({
  page: getPage(),
  color: '#06B6D4',
  show: 'ship',
  cusState: false,
  deliveryState: false,
  fakeUser:{
    username: 'fake_user',
    contactNumber: '852-4567 8901',
    contactEmail: 'username@example.com',
    name: 'Full Name',
    address: '123 Main St\nAnytown, USA\n12345',
    balance: 1000
  }, 
  current: null,
  colors: {
    laces: "#d3d3d3",
    mesh: "#d3d3d3",
    caps: "#d3d3d3",
    inner: "#d3d3d3",
    sole: "#d3d3d3",
    stripes: "#d3d3d3",
    band: "#d3d3d3",
    patch: "#d3d3d3",
  },
  myItemShow: 'shoe',
  ColorPickerOn: false,
  logoDecal: 'logo.png',
  fullDecal: 'threejs.png',
  isFullTexture : false,
  isLogoTexture : true,
  TShirtColor: '#DDDCDE',
});

export default state;