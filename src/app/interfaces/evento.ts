import { TipoApuesta } from './tipo-apuesta';
import { TipoEvento } from './tipo-evento';

export interface Evento {
    id?: number;
    codigo: string;
    nombre: string;
    tipoEventoId: number;
    tipoEvento?: TipoEvento;
    activo: boolean;
    tiposApuesta: TipoApuesta[]
}
