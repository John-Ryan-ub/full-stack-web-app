import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.html',
  styleUrl: './pokemon-form.css',
})
export class PokemonForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected pokemonService = inject(Pokemon);

  protected pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: [1, [Validators.required, Validators.min(1)]],
    nature: ['', Validators.required],
  });

  ngOnInit() {
    //Initial fetch function to show data when the components loads
    this.pokemonService.fetchPokemon();
  }

  protected savePokemon() {
    if (this.pokemonForm.invalid) {
      this.pokemonForm.markAllAsTouched();
      return;
    }

    this.pokemonService.savePokemon(this.pokemonForm.getRawValue()).subscribe({
      next: () => {
        this.pokemonService.fetchPokemon();
        this.pokemonForm.reset();
        console.log('Pokemon saved successfully');
      },
    });
  }
}