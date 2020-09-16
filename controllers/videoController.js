import { dbvideos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", dbvideos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  // const searchingBy = req.query.term
  res.render("search", { pageTitle: "Search", searchingBy, dbvideos });
  return searchingBy;
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  //To Do : Upload and save video
  res.redirect(routes.videosDetail(1234));
};

export const videosDetail = (req, res) => {
  const {
    params: { id: videoId },
  } = req;
  // const videoId = req.params.id
  res.render("videosDetail", { pageTitle: "Videos Detail", videoId });
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
