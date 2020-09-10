import { EventApi, Duration } from '@fullcalendar/common';

export interface DraggableEvent extends EventApi {
	startTime: Duration;
	duration: Duration;
	create: boolean;
}
