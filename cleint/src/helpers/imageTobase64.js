const imageTobase64 = async (image) => {
    if (image.size > 2 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 2 MB');
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(image);
  
    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
    return data;
  };
  
  export default imageTobase64;
  