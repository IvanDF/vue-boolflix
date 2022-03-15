/**************
 * BOOLFLIX
 *************/

/****************************
 * SLIDER
 ***************************/

const booleanTv = new Vue({
  el: "#boolean-tv",

  data: {
    // HEADER INDEX
    navIndex: "",

    // HEADER MENU
    headerMenu: [
      {
        item: "Home",
        icon: "fas fa-home",
      },
      {
        item: "Film",
        icon: "fas fa-film",
      },
      {
        item: "Serie Tv",
        icon: "fas fa-tv",
      },
      {
        item: "Lingua",
        icon: "fas fa-language",
        dropdown: ["IT", "EN", "DE", "JA", "RU"],
      },
    ],

    // SET SEARCH INPUT
    search: "",

    filterContent: "",

    // API CONTENT

    // LANGUAGES
    lang: "it",

    // ARRAYAS
    filmList: null,
    tvsList: null,

    // MEDIA ELEMENTS
    indexFilm: "",
    indexTvs: "",

    allGenres: [],
    genreSelected: "all",

    /******************
     * MEDIA SLIDER
     *****************/

    indexMedia: 0,

    mediaList: [
      {
        cover: "./img/slider/tf1.mp4",
        title: "./img/slider/tf1.png",
      },
      {
        cover: "./img/slider/tf2.mp4",
        title: "./img/slider/tf2.png",
      },
      {
        cover: "./img/slider/tf3.mp4",
        title: "./img/slider/tf3.png",
      },
      {
        cover: "./img/slider/tf4.mp4",
        title: "./img/slider/tf4.png",
      },
      {
        cover: "./img/slider/tf5.mp4",
        title: "./img/slider/tf5.png",
      },
      {
        cover: "./img/slider/tf6.mp4",
        title: "./img/slider/tf6.png",
      },
    ],

    // FLAGS
    languages: ["it", "en", "de"],
  },

  created() {
    this.getApiGenres("genre/movie/list");
    this.getApiGenres("genre/tv/list");

    /******************
     * MEDIA SLIDER
     *****************/

    this.startSlider();
  },

  methods: {
    // FILTER SEARCH
    filterSearch() {
      if (this.search.length >= 3) {
        this.films();
        this.tvs();
      }
    },
    // FILTER SEARCH AND CLEAN INPUT
    filterSearchClear() {
      this.filterSearch();
      this.search = "";
    },
    // POPULATING FILM LIST
    films() {
      this.getApi("search/movie");
    },
    // POPULATING TVS LIST
    tvs() {
      this.getApi("search/tv");
    },
    // POPULATING ALL GERNES
    getApiGenres(mediaUrl) {
      urlPrefix = "https://api.themoviedb.org/3/" + mediaUrl;
      axios
        .get(urlPrefix, {
          params: {
            api_key: "a717627ec3d5a47c53e51c018fb90f3d",
            language: this.lang,
          },
        })
        .then((valid) => {
          // handle success
          this.allGenres = valid.data.genres;
        })
        .catch((invalid) => {
          // handle error
          console.log(invalid);
        });
    },
    // GET API
    getApi(mediaUrl) {
      urlPrefix = "https://api.themoviedb.org/3/" + mediaUrl;
      axios
        .get(urlPrefix, {
          params: {
            api_key: "a717627ec3d5a47c53e51c018fb90f3d",
            language: this.lang,
            query: this.search,
          },
        })
        .then((valid) => {
          // handle success
          if (mediaUrl === "search/movie") {
            this.filmList = valid.data.results;
          } else if (mediaUrl === "search/tv") {
            this.tvsList = valid.data.results;
            console.log(this.tvsList);
          }
        })
        .catch((invalid) => {
          // handle error
          console.log(invalid);
        });
    },
    // SET VOTE FROM 1 TO 5
    getValutation(vote) {
      return Math.ceil(vote / 2);
    },
    // SET DYNAMICALLY FLAGS
    checkLanguage(el) {
      return this.languages.includes(el.original_language) ? true : false;
    },
    // SHOW DROPDOWN
    showDropdown(el, index) {
      if (this.navIndex === "") {
        this.navIndex = index;
      } else {
        this.navIndex = "";
      }

      this.filterContent = el.toLowerCase();
    },
    changeLang(el) {
      this.lang = el.toLowerCase();
    },
    filterGenre(genreId) {
      if (this.genreSelected === "all") {
        return true;
      }

      if (genreId.includes(this.genreSelected)) {
        return true;
      } else {
        return false;
      }
    },
    // readDescriptionFilm(index) {
    //     if ( this.indexFilm === index ) {
    //         this.indexFilm = ''
    //     } else {
    //         this.indexFilm = index
    //     }
    //     this.indexTvs = ''
    // },
    // readDescriptionTvs(index) {
    //     if ( this.indexTvs === index ) {
    //         this.indexTvs = ''
    //     } else {
    //         this.indexTvs = index
    //     }
    //     this.indexFilm = ''
    // },
    /******************
     * MEDIA SLIDER
     *****************/
    prev() {
      this.indexMedia--;

      if (this.indexMedia < 0) {
        this.indexMedia = this.mediaList.length - 1;
      }
    },
    next() {
      this.indexMedia++;

      if (this.indexMedia > this.mediaList.length - 1) {
        this.indexMedia = 0;
      }
    },
    navCircle(index) {
      this.indexMedia = index;
    },
    startSlider() {
      this.intervalId = setInterval(() => {
        this.next();
      }, 5000);
    },
    stopSlider() {
      clearInterval(this.intervalId);
    },
  },
});
