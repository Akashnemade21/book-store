export async function login({ email, password }: { email: string; password: string }) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    debugger;
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.user));

    if (res.ok) {
      if (res.ok) {
        return {
          success: true,
          token: data.token,
          user: data.user,
        };
      } else {
        return {
          success: false,
          token: '',
          user: {},
        };
      }
    } else {
      return {
        success: false,
        token: '',
        user: {},
      };
    }
  } catch (error) {
    return {
      success: false,
      token: '',
      user: {},
    };
  }
}

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        statsu: 'active',
        profilePic: '',
        role: 'regular',
      }),
    });

    if (res.ok) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
}

export async function logout() {
  await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '',
  });

  return {
    success: true,
    token: '',
    user: {},
  };
}

export async function getBooks() {
  try {
    const res = await fetch('/api/book/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        books: data.books,
      };
    } else {
      return {
        success: false,
        message: data.message,
        books: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      books: [],
    };
  }
}

export async function getBookById(bookId: string, userId: string) {
  try {
    const res = await fetch(`/api/book/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const bookData = await res.json();
    if (res.ok) {
      return {
        success: true,
        message: 'Data fetched successfully',
        book: bookData.book,
        reviews: bookData.book.reviews,
      };
    } else {
      return {
        success: false,
        message: bookData.message,
        books: [],
        reviews: [],
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      books: [],
      reviews: [],
    };
  }
}

export async function submitReview({
  rating,
  bookId,
  reviewText,
  date,
}: {
  rating: number;
  bookId: number;
  reviewText: string;
  date: string;
}) {
  try {
    const res = await fetch('/api/review/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
        bookId: bookId,
        reviewText: reviewText,
        date: date,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        review: data.review,
      };
    } else {
      return {
        success: false,
        message: data.message,
        review: {},
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      review: {},
    };
  }
}

export async function updateReview({
  reviewId,
  rating,
  reviewText,
  date,
}: {
  reviewId: number;
  rating: number;
  reviewText: string;
  date: string;
}) {
  try {
    const res = await fetch(`/api/review/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: rating,
        reviewText: reviewText,
        date: date,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: data.message,
        review: data.review,
      };
    } else {
      return {
        success: false,
        message: data.message,
        review: {},
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      review: {},
    };
  }
}
