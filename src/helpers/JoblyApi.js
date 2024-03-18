import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    
    // Pull the token from the localstorage
    const token = localStorage.getItem(`_token`)

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      // Uncomment line below for more detailed debug
      // console.debug(`MAKING API CALL\n`, method, url, `\ndata:`, data, `\nheaders:`, headers)
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      let status = err.response.status;
      throw Array.isArray(message) ? { message, status } : { message:[message], status };
    }
  }

  // Individual API routes

  /** Get details on a company by handle.
   *
   *  {  
   *    name, handle, description, logoUrl, numEmployees, 
   *        jobs: [ { equity, id, salary, title }, ... ]
   *  }
  */
  static async getCompany(handle) {
    try{
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }catch(err){
      console.error(err);
    }
  }

  /**getAllCompanies
   *  Returns an array of all companies
   *        [ { name, handle, description, logoUrl, numEmployees }, ... ]
   */
  static async getAllCompanies() {
    try{
      let res = await this.request(`companies/`);
      return res.companies;
    }catch(err){
      console.error(err);
    }
  }

  /**getAllJobs
   * Returns an array of all jobs
   *        [ { companyHandle, companyName, equity, id, salary, title }, ... ]
   */
  static async getAllJobs() {
    try{
      let res = await this.request(`jobs/`);
      return res.jobs;
    }catch(err){
      console.error(err);
    }
  }

  /**applyToJob
   *  As user [username], attempts to apply to job [id]
   *      returns: jobID
  */
  static async applyToJob(username, id){
    try{
      let res = await this.request(`users/${username}/jobs/${id}`,{}, "post");
      return res.applied;
    }catch(err){
      console.error(err)
    }
  }

  /** getUserData
   * Returns response:
   *    { username, firstName, lastName, email, isAdmin,
   *      jobs:[{ id, title, companyHandle, companyName, state }, ...]
   *   }
   */
  static async getUserData(username){
    try{
      let res = await this.request(`users/${username}`)
      return res.user;
    }catch(err){
      console.error(err)
    }
  }

  /** getAppliedJobsIDs
   * Returns array of job IDs user has applied to:
   *    [ appliedJobID, ... ]
   */
  static async getAppliedJobIDs(username){
    try{
      let res = await this.request(`users/${username}`)
      let applications = res.user.applications;
      return applications;
    }catch(err){
      console.error(err)
    }
  }

  /** updateUserData
   * Returns response:
   *    { username, firstName, lastName, email, isAdmin }
   */
  static async updateUserData(currUser, data){
    const {username, isAdmin, ...newData} = data;
    try{
      let res = await this.request(`users/${currUser}`, newData, "patch")
      return res.user;
    }catch(err){
      console.error(err)
    }
  }
  
  /** updateUserData
   * Returns response:    token
   */
  static async signUp(data){
    try{
      let res = await this.request(`auth/register`, data, "post")
      return res.token;
    }catch(err){
      console.error(err)
      return err;
    }
  }

  /**login
   * Returns response:    token
   */
  static async login(data){
    try{
      let res = await this.request(`auth/token`, data, "post")
      return res.token
    }catch(err){
      console.error(err)
      return err;
    }
  }

}

export default JoblyApi;




