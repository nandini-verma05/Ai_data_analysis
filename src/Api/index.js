import axios from 'axios'
import Swal from 'sweetalert2';

const API_BASE_URL = "http://127.0.0.1:8000";

const handleError = (error, action = "processing-request") => {
  console.error(`Error ${action}:`, error.response?.data || error.message);
  Swal.fire({
    icon: "error",
    title: "Error",
    text: error.response?.data?.detail || "Something went wrong",
    confirmButtonText: "OK",
  });
  return {success: false, error: error.response?.data || error.message};
}

export const uploadFilesAPI = async (selectedFiles) => {
  if (!selectedFiles.length) return;

  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/upload/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Files uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    return handleError(error, "uploading files")
  }
};

export const exceuteQuery = async (query) => {
  
  try {
    console.log("Query : " + query)
    const response = await axios.post(`${API_BASE_URL}/api/execute_query/`, { "query": query });
    console.log("Query executed successfully:", response.data);
    return response.data;
  }catch (error) {
    console.error("Error executing query:", error);
    return handleError(error, "excute query");
  }

}

export const chartGenerator = async (query) => {
  try {
    console.log("Query : " + query)
    const response = await axios.post(`${API_BASE_URL}/chart/chart/`, {query }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Chart generated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating chart:", error.response?.data || error.message);
    // return handleError(error, "chart generation");
  }
}

export const cleanFile = async (table_name) => {
   try{
       console.log("Table Name : " + table_name)
       const response = await axios.post(`${API_BASE_URL}/api/clean_file?table_name=${encodeURIComponent(table_name)}`);
       console.log("File cleaned successfully:", response.data);
       return response.data;
   }catch (error) {
       console.error("Error cleaning file:", error.response?.data || error.message);
       return handleError(error, "cleaning file");
   }
} 

export const cancel_clean_file = async (table_name) => {
   try{
      console.log("Table name:", table_name);
      const response = await axios.post( `${API_BASE_URL}/api/cancel_clean?table_name=${encodeURIComponent(table_name)}` );
      console.log("Cancel clean file response:", response.data);
      return response.data;
   }catch(error){
     console.error("Error cancelling clean file:", error);
     return handleError(error, "cancelling clean file");
   }
}


export const connectToDatabase = async (dbParams) => {
   try{
      const response = await axios.post(`${API_BASE_URL}/api/connect_db`, dbParams);
      console.log("Database connection response:", response.data);
      return response.data;
   }catch (error){
     console.error("Error connecting to database:", error);
     return handleError(error, "connecting to database");;
   }
}


export const loadTablesApi = async (table_name) => {
  try{
    console.log("Loading Tables : "+ table_name);
    const response = await axios.post(`${API_BASE_URL}/api/load_tables`, table_name, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log("Tables loaded successfully:", response.data);
    return response.data;
  }catch (error) {
    console.error("Error loading tables:", error.response?.data || error.message);
    return handleError(error, "loading tables");
  }
}