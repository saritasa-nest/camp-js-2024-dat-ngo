import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

/** JSDoc . */
export const fetchGenres = createAsyncThunk(
	'genres/fetch',
	() => GenresService.fetchGenres(),
);
