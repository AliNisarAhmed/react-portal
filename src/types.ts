export interface Inspection {
	id: number;
	createdAt: string;
	type?: string;
	customerName?: string;
	customerEmail: string;
	kilometers?: string;
	windshieldCondition?: string;
	fuel?: string;
	notes?: string;
	// @References(typeof(PickListItem))
	status?: number;

	// @References(typeof(User))
	userId?: number;

	// @References(typeof(Location))
	locationId?: number;

	// @References(typeof(ReferenceNo))
	referenceNoId?: number;

	user?: User;
	location?: Location;
	referenceNo: ReferenceNo;
}

export interface User {
	id?: number;
	createdAt?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	// @References(typeof(Location))
	locationId?: number;

	location?: Location;
}

export interface Location {
	id?: number;
	createdAt?: string;
	name?: string;
	city?: string;
	province?: string;
	postalCode?: string;
	country?: string;
	address?: string;
	// @References(typeof(PickListItem))
	timezone?: number;
}

export interface ReferenceNo {
	id?: number;
	value?: string;
}
