import { EventApi, Duration } from '@fullcalendar/core';

export interface DraggableEvent extends EventApi {
	startTime: Duration;
	duration: Duration;
	create: boolean;
}
