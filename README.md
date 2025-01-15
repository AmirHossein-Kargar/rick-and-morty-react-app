
# Rick and Morty React App 🚀

A React-based web application that allows users to explore characters, episodes, and locations from the Rick and Morty universe. This project leverages the [Rick and Morty API](https://rickandmortyapi.com/) to fetch and display dynamic data.



## Features ✨

- **Character Browser**: View detailed information about characters from the show. 🧑‍🚀
- **Episode Explorer**: Discover episodes and their associated characters. 🎥
- **Location Tracker**: Explore locations and see who resides there.📍
- **Search Functionality**: Quickly search for characters, episodes, or locations. 🔍
- **Responsive Design**: Fully optimized for desktop and mobile devices. 📱
## Deployment 🚢
This project is deployed on [Vercel](https://vercel.com/). Check out the live version here: [Live Demo](#).
## Technologies Used 🛠️

- **React**: Frontend library for building the UI. ⚛️
- **Axios**: For making API requests. 🌐
- **CSS/Styled Components**: For styling and layout. 🎨
## API Reference 📚

The application uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch the following data:

- **Characters**: `/character`
- **Episodes**: `/episode`
- **Locations**: `/location`

Example request:
```javascript
import axios from 'axios';

const fetchCharacters = async () => {
  const response = await axios.get('https://rickandmortyapi.com/api/character');
  console.log(response.data);
};
```
## Contributing 🤝
Contributions are welcome! To contribute:
1.  Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## Contact 📬

For any questions or feedback, feel free to reach out:

- GitHub: [AmirHossein-Kargar](https://github.com/AmirHossein-Kargar)
- Email: [AmirKaargar@hotmail.com](mailto:your-email@example.com)

---
