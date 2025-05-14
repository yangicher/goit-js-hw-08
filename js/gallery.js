const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];  

const gallery = document.querySelector('.gallery');
let currentIndex = 0;

function update(instance) {
  const { original, description } = images[currentIndex];
  const img = instance.element().querySelector('img');
  const slideCounter = instance.element().querySelector('.slide-counter')
  const descriptionText = instance.element().querySelector('.description-text')
  img.src = original;
  img.alt = description;
  slideCounter.innerText = `slide: ${currentIndex + 1}/${images.length}`
  descriptionText.innerText = description
}

function create(index) {
  const { original, description } = images[index];

  const instance = basicLightbox.create(`
    <div class="modal-container">
      <button class="prev-btn">&#10216;</button>
      <div class="img-container">
        <img src="${original}" alt="${description}"/>
        <div class="description-wrapper">
          <p class="description-text">${description}</p>
        </div>
      </div>
      <button class="next-btn">&#10217;</button>
      <p class="slide-counter">slide: ${index + 1}/${images.length}</p>
    </div>
  `, {
    onShow: (instance) => {
      instance.element().querySelector('.prev-btn').onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        update(instance);
      };
      instance.element().querySelector('.next-btn').onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        update(instance);
      };
    }
  });

  return instance;
}

const markup = images.map(({ preview, original, description }) => 
`<li class="gallery-item">
  <a class="gallery-link" href="large-image.jpg">
    <img
      class="gallery-image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>`).join('');

gallery.innerHTML = markup;

gallery.addEventListener('click', event => {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') return;

  currentIndex = images.findIndex(img => img.original === target.dataset.source);
  const instance = create(currentIndex);
  
  instance.show()
});