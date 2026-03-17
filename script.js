const contactNumber = '55389998302389';

const skinTypeLabels = {
  seca: 'pele seca',
  mista: 'pele mista',
  oleosa: 'pele oleosa',
  sensivel: 'pele sensível'
};

const concernLabels = {
  hidratar: 'hidratação profunda',
  luminosidade: 'perda de luminosidade',
  equilibrio: 'controle de oleosidade',
  suavizar: 'sensibilidade ou irritação'
};

const productSuffix = {
  seca: 'Sedosa',
  mista: 'Equilibrada',
  oleosa: 'Matte Natural',
  sensivel: 'Calmante'
};

const skinFocus = {
  seca: 'Textura rica e protetora que freia a perda hídrica sem pesar.',
  mista: 'Gel-creme leve que equilibra áreas secas e oleosas.',
  oleosa: 'Base aquosa oil-free e toque seco imediato.',
  sensivel: 'Fórmulas sem aromatizantes artificiais e com ativos anti-irritantes.'
};

const concernTemplates = {
  hidratar: {
    label: 'Hidratação profunda',
    baseName: 'Geleias de Banho Repositoras',
    description: 'A linha de Geleias de Banho enriquece o banho com extratos de aveia e camomila, criando um véu nutritivo sem agredir a barreira.',
    features: [
      'Textura gel-creme que desliza sem ressecar.',
      'Óleo de amêndoas doces e manteiga de cupuaçu para toque aveludado.',
      'Ritual com Escalda Pés quente potencializa o conforto corporal.'
    ],
    image: 'cuidados_pele.jpg',
    imageAlt: 'Geleias de banho em potes sobre folhas',
    note: 'Use após sabonete cremoso e finalize com óleo corporal leve enquanto a pele ainda está úmida.'
  },
  luminosidade: {
    label: 'Perda de luminosidade',
    baseName: 'Body Splash Iluminador',
    description: 'O Body Splash combina notas cítricas e florais para reforçar o brilho natural da pele enquanto refresca o dia.',
    features: [
      'Base aquosa com vitamina C vegetal e extrato de hibisco.',
      'Dá glow imediato sem deixar a pele pegajosa.',
      'Pode ser borrifado sobre rosto, corpo e cabelos para um toque perfumado.'
    ],
    image: 'cuidados_naturais.jpg',
    imageAlt: 'Frascos translúcidos com líquidos claros',
    note: 'Use pela manhã e finalize com proteção solar para manter o viço.'
  },
  equilibrio: {
    label: 'Controle de oleosidade',
    baseName: 'Sabonetes Massageadores Equilíbrio',
    description: 'Sabonetes Massageadores com óleos essenciais de alecrim e tea tree limpam profundamente sem agredir as áreas oleosas.',
    features: [
      'Textura sólida com micropartículas de argila branca que depura poros.',
      'Design ergonômico facilita a massagem para estimular a circulação.',
      'Use com água morna e finalize com bruma hidratante para manter o fosco.'
    ],
    image: 'sabonetes.jpg',
    imageAlt: 'Sabonetes artesanais empilhados',
    note: 'Recomenda-se uso diário no rosto e pescoço, alternando com Geleia de Banho nos dias secos.'
  },
  suavizar: {
    label: 'Sensibilidade ou irritação',
    baseName: 'Escalda Pés Calmante',
    description: 'Escalda Pés combina lavanda, camomila e sais minerais para acalmar a pele sensível e reduzir vermelhidão.',
    features: [
      'Sais nobres que aliviam o cansaço ao final do dia.',
      'Pétalas secas e óleos calmantes são aliados da barreira cutânea.',
      'Finalizar com Velas Aromáticas para estender o efeito calmante.'
    ],
    image: 'velas.jpg',
    imageAlt: 'Conjunto calmante com velas e folhas',
    note: 'Repita 2 a 3 vezes por semana e evite água muito quente para não sensibilizar.'
  }
};

const productCatalog = {};
Object.entries(skinTypeLabels).forEach(([skinKey, skinLabel]) => {
  productCatalog[skinKey] = {};
  Object.entries(concernTemplates).forEach(([concernKey, template]) => {
    productCatalog[skinKey][concernKey] = {
      name: `${template.baseName} ${productSuffix[skinKey]}`,
      description: `${template.description} ${skinFocus[skinKey]}`,
      image: template.image,
      imageAlt: template.imageAlt,
      features: template.features,
      tag: `${skinLabel} • ${template.label}`,
      note: template.note
    };
  });
});

function buildWhatsappUrl(product, skinType, concern, notes) {
  const baseMessage = `Olá, quero o ${product.name} para ${skinTypeLabels[skinType]} com foco em ${concernLabels[concern]}.`;
  const extra = notes ? ` Observação: ${notes}.` : '';
  const question = ' Pode me confirmar disponibilidade e prazo?';
  const encoded = encodeURIComponent(`${baseMessage}${extra}${question}`);
  return `https://wa.me/${contactNumber}?text=${encoded}`;
}

function renderProduct(product, skinType, concern, notes) {
  const card = document.getElementById('assistant-card');
  const placeholder = document.querySelector('.assistant-placeholder');
  const image = document.getElementById('assistant-image');
  const tag = document.getElementById('assistant-tag');
  const name = document.getElementById('assistant-product-name');
  const description = document.getElementById('assistant-description');
  const benefits = document.getElementById('assistant-benefits');
  const note = document.getElementById('assistant-note');
  const whatsapp = document.getElementById('assistant-whatsapp');

  image.src = product.image;
  image.alt = product.imageAlt;
  tag.textContent = product.tag;
  name.textContent = product.name;
  description.textContent = product.description;
  benefits.innerHTML = product.features.map(item => `<li>${item}</li>`).join('');
  note.textContent = notes ? `Você mencionou: “${notes}”.` : product.note;
  whatsapp.href = buildWhatsappUrl(product, skinType, concern, notes);
  whatsapp.textContent = 'Enviar Pedido Pelo Whatsapp';

  placeholder.classList.add('hidden');
  card.classList.remove('hidden');
}

function handleFormSubmit(event) {
  event.preventDefault();
  const skinType = document.getElementById('skin-type').value;
  const concern = document.getElementById('concern').value;
  const notes = document.getElementById('notes').value.trim();
  const product = productCatalog[skinType]?.[concern];

  if (!product) {
    const placeholder = document.querySelector('.assistant-placeholder');
    placeholder.textContent = 'Escolha opções válidas para ver a sugestão.';
    return;
  }

  renderProduct(product, skinType, concern, notes);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('assistant-form');
  form.addEventListener('submit', handleFormSubmit);
});
