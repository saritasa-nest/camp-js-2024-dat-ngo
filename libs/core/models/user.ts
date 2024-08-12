import { Injectable } from '@angular/core';
import { Immerable, OmitImmerable } from './immerable';

export class User extends Immerable {
	email: string;

	firstName: string;

	lastName: string;

	avatar: string | null;

	createdAt: Date;

	modifiedAt: Date;

	public constructor(data: UserConstructorData) {
		super();
		this.email = data.email;
		this.avatar = data.avatar;
		this.createdAt = data.createdAt;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.modifiedAt = data.modifiedAt;
	}
}

type UserConstructorData = OmitImmerable<User>;
