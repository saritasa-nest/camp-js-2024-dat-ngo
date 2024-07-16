/* eslint-disable jsdoc/require-jsdoc */
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

/** Anime Data. */
export type animeData = {
	id: number;
	created: string;
	modified: string;
	title_eng: string;
	title_jpn: string;
	image: string;
	aired: {
		start: string;
		end: string | null;
	};
	type: string;
	status: string;
	score: number | null;
	user_score: number | null;
	studios: number[];
	genres: number[];
}

const ELEMENT_DATA: animeData[] = [
	{
		id: 960,
		created: '2024-07-15T08:59:47.445772Z',
		modified: '2024-07-15T08:59:47.445775Z',
		title_eng: '',
		title_jpn: 'BLAME (ブラム!)',
		image:
			'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/anime/images/12707c9f-0e8d-4717-8bb4-e055c08750ae/2713l.jpg',
		aired: {
			start: '2003-10-24T00:00:00Z',
			end: null,
		},
		type: 'ONA',
		status: 'FINISHED',
		score: null,
		user_score: null,
		studios: [],
		genres: [],
	},
	{
		id: 754,
		created: '2024-07-15T08:59:47.417234Z',
		modified: '2024-07-15T08:59:47.417243Z',
		title_eng: '',
		title_jpn: 'BLEACH The Sealed Sword Frenzy',
		image:
			'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/anime/images/0f97e862-ff1e-4434-bbcc-9604fe38269a/834l.jpg',
		aired: {
			start: '2006-03-23T00:00:00Z',
			end: null,
		},
		type: 'SPECIAL',
		status: 'FINISHED',
		score: null,
		user_score: null,
		studios: [],
		genres: [],
	},
	{
		id: 948,
		created: '2024-07-15T08:59:47.444312Z',
		modified: '2024-07-15T08:59:47.444316Z',
		title_eng: '',
		title_jpn: 'BRONZE zetsuai since 1989',
		image:
			'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/anime/images/67b805b0-4359-4c2c-8122-f3cd6b7666ad/73227l.jpg',
		aired: {
			start: '1996-12-04T00:00:00Z',
			end: null,
		},
		type: 'OVA',
		status: 'FINISHED',
		score: null,
		user_score: null,
		studios: [],
		genres: [],
	},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
	selector: 'table-basic-example',
	styleUrl: 'table-component.component.css',
	templateUrl: 'table-component.component.html',
	standalone: true,
	imports: [MatTableModule],
})

export class TableBasicExample {
	public displayedColumns: string[] = ['id', 'name', 'image', 'aired'];

	protected dataSource = ELEMENT_DATA;
}
