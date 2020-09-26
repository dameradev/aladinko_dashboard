export default {
  /**
   * Check if element is in center view right now
   * @param {HTMLElement} element
   * @param {Number} offset
   * @returns {boolean}
   */
  isInView(element, offset = 0) {
    const windowHeight = window.innerHeight;
    const rect = element.getBoundingClientRect();

    if (rect.height >= windowHeight) {
      return rect.top <= 0 / 2 && rect.bottom >= 0;
    } else {
      return rect.bottom <= rect.height && rect.height - Math.abs(rect.top) >= 0;
    }
  },
  /**
   * Scroll to the element
   * @param {HTMLElement} element
   */
  // scrollTo(element) {
  //   const options = {
  //     behavior: "smooth",
  //     block: "start",
  //     inline: "center"
  //   };
  //
  //   if (element.getBoundingClientRect().height >= window.innerHeight) {
  //     options.block = "start";
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     element.scrollIntoView(options);
  //
  //     return setTimeout(() => {
  //       return resolve();
  //     }, 50);
  //   });
  // },

  scrollTo(element, handleScrolling = () => {}, duration = 200) {
    const start = window.pageYOffset;
    const header = window.document.querySelector('.header');
    const toDesktop = element.offsetTop - 20;
    const toMobile =
      window.pageYOffset < element.offsetTop ? element.offsetTop + 136 : element.offsetTop;

    const to = window.innerWidth > 850 ? toDesktop : toMobile;

    const increment = 20;
    let currentTime = 0;

    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/Opera Mini/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      window.scrollTo({ top: to });
      handleScrolling();
    } else {
      const animateScroll = () => {
        currentTime += increment;
        const val = start + ((to - start) / duration) * currentTime;
        window.scrollTo({ top: val });
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        } else {
          handleScrolling();
        }
      };
      animateScroll();
    }

    return new Promise((resolve, reject) => {
      return resolve();
    });
  },

  handleError(err) {
    const {
      message: errorMessage,
      data: { message: dataErrorMessage } = {},
      response: { data: { error, message } = {} } = {}
    } = err;

    if (error) {
      return typeof error === 'string' ? { message: message || error } : error;
    } else if (errorMessage) {
      return { message: errorMessage };
    } else if (dataErrorMessage) {
      return { message: dataErrorMessage };
    } else {
      return { message: 'An error has occurred' };
    }
  },

  disablePageScroll() {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const currentWidth = windowWidth - documentWidth;
    document.body.setAttribute('style', `overflow: hidden; padding-right: ${currentWidth}px;`);

    if (currentWidth) {
      document.querySelector('header').classList.add('header_locked');
    }
  },

  enablePageScroll() {
    document.body.removeAttribute('style');
    document.querySelector('header').classList.remove('header_locked');
  },

  splitArrayIntoChunks(array, itemsPerChunk = 2) {
    return array.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsPerChunk);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  },
  // TODO: migrate from Moment to date-fns
  formatDate(date, dateFormat = 'MMMM d, yyyy, h:mm aa') {
    if (date) {
      return null;
      // return format(date, dateFormat);
    } else {
      return 'Invalid date';
    }
  },
  getRestaurantLogoOrPlaceholder(image) {
    const RESTAURANTS_LOGO_PLACEHOLDER = '/images/blank-profile-picture.png';
    return image || RESTAURANTS_LOGO_PLACEHOLDER;
  },
  isDevelopment() {
    return process.env.NODE_ENV === 'development';
  },
  /**
   * Convert price number to string $xx.xx or $ xx.xx
   * @param price {Number}
   * @param withMargin {Boolean} - should result have space between sign and number
   * @return {string}
   */
  formatPrice(price, withMargin = false) {
    return `$${withMargin ? ' ' : ''}${(+price).toFixed(2)}`;
  }
};
