import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

const images = [
  {
    id: 1,
    title: 'Forest',
    imageUrl:
      'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
  },
  {
    id: 2,
    title: 'Deer',
    imageUrl:
      'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
  {
    id: 3,
    title: 'Nature',
    imageUrl:
      'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
    text: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues.',
  },
  {
    id: 4,
    title: 'Stones',
    imageUrl:
      'https://assets.hongkiat.com/uploads/100-absolutely-beautiful-nature-wallpapers-for-your-desktop/blue-sea-sunset.jpg',
    text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
  },
  {
    id: 5,
    title: 'Flowers',
    imageUrl:
      'https://www.rd.com/wp-content/uploads/2020/04/GettyImages-1093840488-5-scaled.jpg',
    text: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. ',
  },
];

function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    let intervalId;

    if (autoplay) {
      intervalId = setInterval(() => {
        setSelectedImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [autoplay]);

  const handlePreviousClick = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAutoplayToggle = () => {
    setAutoplay((prevValue) => !prevValue);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setAutoplay(false);
  };

  return (
    <div className='App'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component='img'
              height='300'
              image={images[selectedImageIndex].imageUrl}
              title={images[selectedImageIndex].title}
              style={{ borderRadius: '15px' }}
            />
            <Grid
              container
              spacing={2}
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              marginTop='5px'
            >
              {images.map((image, index) => (
                <Grid item xs={2} key={image.id}>
                  <Card
                    onClick={() => handleThumbnailClick(index)}
                    raised={index === selectedImageIndex}
                  >
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        height='100'
                        image={image.imageUrl}
                        title={image.title}
                        style={
                          index === selectedImageIndex
                            ? { border: '3px solid black' }
                            : {
                                filter: 'grayscale(100%)',
                              }
                        }
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {images[selectedImageIndex].title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {images[selectedImageIndex].text}
            </Typography>
          </CardContent>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <IconButton onClick={handleAutoplayToggle}>
              {autoplay ? <Pause /> : <PlayArrow />}
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ textAlign: 'center' }}>
            <IconButton onClick={handlePreviousClick}>
              <span>&lt;</span>
            </IconButton>
            {images.map((image, index) => (
              <IconButton
                key={image.id}
                onClick={() => handleThumbnailClick(index)}
                style={{ opacity: index === selectedImageIndex ? 1 : 0.5 }}
              >
                <span>&#8226;</span>
              </IconButton>
            ))}
            <IconButton onClick={handleNextClick}>
              <span>&gt;</span>
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
