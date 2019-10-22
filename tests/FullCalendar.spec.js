import { render } from '@testing-library/svelte';
import FullCalendar from '../src/components/FullCalendar.svelte';
import daygridPlugin from '@fullcalendar/daygrid';
import '@testing-library/jest-dom/extend-expect';

const PLUGINS = [daygridPlugin];
const NOW_DATE = new Date();
