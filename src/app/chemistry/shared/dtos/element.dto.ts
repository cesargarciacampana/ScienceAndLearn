export class ElementDTO {

    constructor(
        public symbol : string,
        public name : string,
        public source : string,
		public number : number,
		public atomic_mass: number,
		public category: string,
		public boil: number,
		public melt: number,
		public density: number,
		public discovered_by: string,
		public named_by: string,
		public phase: string,
		public electron_configuration: string
    ) {
    }
}