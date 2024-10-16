'use server';

export async function login({ email, password }: { email: string; password: string }) {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      return {
        success: true,
        token: data.token,
      };
    } else {
      return {
        success: false,
        token: '',
      };
    }
  } catch (error) {
    return {
      success: false,
      token: '',
    };
  }
}

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
  const body = {
    name: name,
    email: email,
    password: password,
    statsu: 'active',
    role: 'regular',
  };
  try {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

export async function getBooks(token: string) {
  const Books = [
    {
      id: 3,
      title: 'Junaid Nemade',
      author: 'Junaid Nemade',
      publicationDate: '1998-09-20T20:00:00.000Z',
      bookCover: '',
      rating: 3,
      reviewNum: 4,
      createdAt: '2024-10-15T09:36:32.000Z',
      updatedAt: '2024-10-15T11:57:02.000Z',
    },
    {
      id: 4,
      title: 'Junaid Nemade 1',
      author: 'Junaid Nemade 1',
      publicationDate: '1998-09-20T20:00:00.000Z',
      bookCover: '',
      rating: 3,
      reviewNum: 4,
      createdAt: '2024-10-15T09:36:32.000Z',
      updatedAt: '2024-10-15T11:57:02.000Z',
    },
  ];
  // return Books;
  try {
    const res = await fetch('http://localhost:3000/book/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
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

export async function getBook(bookId: string) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return res;
    } else {
      return {
        invalidLogin: false,
      };
    }
  } catch (error) {
    return {
      invalidPassword: false,
    };
  }
}
