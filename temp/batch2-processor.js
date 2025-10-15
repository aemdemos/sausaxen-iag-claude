// Batch 2 Product Page Processor
// This script will be used to track processing of all 10 salt & organic products

const products = [
  {
    url: 'https://aashirvaad.com/our-products/salt/iodized-salt.html',
    category: 'salt',
    slug: 'iodized-salt',
    title: 'Iodized Salt',
    description: 'Crafted from natural sea salt crystals using a meticulous 4-step advantage process',
    productImage: 'https://s7ap1.scene7.com/is/image/itcportalprod/aashirvaad%20salt-1',
    bannerImage: 'https://s7ap1.scene7.com/is/image/itcportalprod/desktop%20salt%20iodized',
    features: [
      { name: '3-week solar evaporation', image: 'https://s7ap1.scene7.com/is/image/itcportalprod/Solar%20%20Evaporation' },
      { name: '2-Step Cleaning', image: 'https://s7ap1.scene7.com/is/image/itcportalprod/cleaning%20(1)' },
      { name: 'Iodine assured', image: 'https://s7ap1.scene7.com/is/image/itcportalprod/Iodine%20assured' },
      { name: 'Moisture-lock packaging', image: 'https://s7ap1.scene7.com/is/image/itcportalprod/Moisture%20lock%20packaging' },
    ],
    packSizes: ['1KG'],
  },
  { url: 'https://aashirvaad.com/our-products/salt/salt-active.html', category: 'salt', slug: 'salt-active' },
  { url: 'https://aashirvaad.com/our-products/salt/himalayan-pink-salt.html', category: 'salt', slug: 'himalayan-pink-salt' },
  { url: 'https://aashirvaad.com/our-products/salt/iodized-crystal-salt.html', category: 'salt', slug: 'iodized-crystal-salt' },
  { url: 'https://aashirvaad.com/our-products/organic/organic-chana-dal.html', category: 'organic', slug: 'organic-chana-dal' },
  { url: 'https://aashirvaad.com/our-products/organic/organic-tur-dal.html', category: 'organic', slug: 'organic-tur-dal' },
  { url: 'https://aashirvaad.com/our-products/organic/organic-moong-dal.html', category: 'organic', slug: 'organic-moong-dal' },
  { url: 'https://aashirvaad.com/our-products/organic/organic-urad-dal.html', category: 'organic', slug: 'organic-urad-dal' },
  { url: 'https://aashirvaad.com/our-products/organic/organic-masoor-dal.html', category: 'organic', slug: 'organic-masoor-dal' },
  { url: 'https://aashirvaad.com/our-products/organic/organic-rajma.html', category: 'organic', slug: 'organic-rajma' },
];

module.exports = products;
