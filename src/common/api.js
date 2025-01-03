import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
//const BASE_URL = "https://node-fitness.onrender.com";

console.log(process.env.REACT_APP_BASE_URL);

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FitnessApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    //console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FitnessApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get videos with current User */
  static async getVideos(id, mode = "muscle") {
    //const res = await axios.get(`${BASE_URL}/users/${currentUser.id}/videos`);
    const res = await this.request(`users/${id}/videos/${mode}`);
    return res;
  }

  static async addVideo(name, videoid) {
    const res = await this.request(`videos/${name}/${videoid}`, {}, "post");
    return res;
  }

  static async deleteUserVideo(id) {
    const res = await this.request(`videos/uv/${id}`, {}, "delete");
    return res;
  }

  static async getPlaylists(id) {
    const res = await this.request(`users/${id}/playlists-with-videos`);
    return res;
  }

  static async getPlaylistNames() {
    const res = await this.request(`playlists`);
    return res;
  }

  static async addVideoToPlaylist(playlistname, videoid) {
    const res = await this.request(
      `playlists/videos/${playlistname}/${videoid}`,
      {},
      "post"
    );
    return res;
  }

  static async deletePlaylistVideo(playlistname, videoid) {
    const res = await this.request(
      `playlists/videos/${playlistname}/${videoid}`,
      {},
      "delete"
    );
    return res;
  }

  static async rateVideo(id, rating) {
    //const res = await this.request(`videos/rating/${1}`, rating, "post");
    const res = await this.request(`videos/rating/${id}/${rating}`, {}, "post");
    return "res";
  }

  static async getBestVideos() {
    const res = await this.request(`videos`);
    return res;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  static async resetPassword(data) {
    let res = await this.request("auth/passwordreset", data, "patch");
    return res.token;
  }

  /** Save user profile edits. */
  /*static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }*/

  static async updateProfile(id, data) {
    let res = await this.request(`users/${id}`, data, "patch");
    return res.user;
  }

  /** Delete user profile. */
  /*static async deleteProfile(username) {
    await this.request(`users/${username}`, {}, "delete");
  }*/
  static async deleteUser(id) {
    await this.request(`users/${id}`, {}, "delete");
  }
}

// for now, put token ("testuser" / "password" on class)
FitnessApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default FitnessApi;
