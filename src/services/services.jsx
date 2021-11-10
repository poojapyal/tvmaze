import axios from "axios";

const getMoviesList = async (term) => {
  try {
    const response = await axios.get("https://api.tvmaze.com/search/shows?q=" + term);
    return response;
  } catch (error) {
    return error;
  }
};


const stripHtml = (html) => {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }


export { getMoviesList, stripHtml };
