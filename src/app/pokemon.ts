import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class Pokemon {
    private http = inject(HttpClient);
    private apiURL = 'http://localhost:5000/api/pokemon';

    //Reactive state management using isgnals
    pokemonList = signal<any[]>([]);

    fetchPokemon(){
        this.http.get<any[]>(this.apiURL).subscribe(data => this.pokemonList.set(data));
    }

    //this save our data to the database
    savePokemon(data: any){
        return this.http.post(this.apiURL, data);
    }
}

