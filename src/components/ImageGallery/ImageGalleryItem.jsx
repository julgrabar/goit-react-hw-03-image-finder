export const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};
