import mongoose from "mongoose";

const { ObjectId } =
  mongoose.Schema;

/* =========================
   REVIEW SCHEMA
========================= */

const reviewSchema =
  mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        required: true,

        ref: "User",

      },

    },

    {
      timestamps: true,
    }

  );

/* =========================
   MOVIE SCHEMA
========================= */

const movieSchema =
  new mongoose.Schema(

    {

      /* MOVIE NAME */

      name: {
        type: String,
        required: true,
      },

      /* POSTER IMAGE */

      image: {
        type: String,
      },

      /* RELEASE YEAR */

      year: {
        type: Number,
        required: true,
      },

      /* GENRE */

      genre: {

        type: ObjectId,

        ref: "Genre",

        required: false,

      },

      /* DESCRIPTION */

      detail: {
        type: String,
        required: true,
      },

      /* CAST */

      cast: [
        {
          type: String,
        },
      ],

      /* TRAILER */

      trailer: {
        type: String,
      },

      /* REVIEWS */

      reviews: [
        reviewSchema,
      ],

      /* TOTAL REVIEWS */

      numReviews: {

        type: Number,

        required: true,

        default: 0,

      },

      /* CREATED DATE */

      createdAt: {

        type: Date,

        default: Date.now,

      },

    },

    {
      timestamps: true,
    }

  );

/* =========================
   MODEL
========================= */

const Movie =
  mongoose.model(
    "Movie",
    movieSchema
  );

export default Movie;