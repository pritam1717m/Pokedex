import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetalis(id) {
  const [pokemon, setPokemon] = useState({
    isLoading: true,
  });
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  async function downloadPokemon() {
    const response = await axios.get(pokemonUrl).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
    const pokemonOfSameType = await axios
      .get(
        `https://pokeapi.co/api/v2/type/${
          response.data.types ? response.data.types[0].type.name : ""
        }`
      )
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    setPokemon({
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
      abilities: response.data.abilities.map((a) => a.ability.name),
      similarPokemons: pokemonOfSameType.data.pokemon.slice(0, 5),
      isLoading: false,
    });

    setPokemonListState({
      ...pokemonListState,
      type: response.data.types ? response.data.types[0].type.name : "",
    });
  }
  const [pokemonListState, setPokemonListState] = usePokemonList();

  useEffect(() => {
    downloadPokemon();
  }, [id]);
  return [pokemon];
}

export default usePokemonDetalis;
