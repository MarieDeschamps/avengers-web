package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.avengers.domain.Hero;
import io.avengers.service.HeroService;

@Path("heroes")
@Produces(MediaType.APPLICATION_JSON)
public class HeroResource {

	@GET
	public Set<Hero> getAllHeroes(){
		HeroService hService = new HeroService();
		return hService.findAll();
	}
	
	@GET
	 @Path("{id}")
	public Hero getHeroById(@PathParam("id") int id){
		HeroService hService = new HeroService();
		return hService.findHero(id);
	}
	
	
	@POST
	public Response createHero(Hero hero){
		if(hero==null || hero.getAlias().isEmpty()){
			return Response.status(406).entity("\"Empty hero\"").build();
		}
		
		new HeroService().createHero(hero);
		
		return Response.status(201).entity("{\"id\":"+hero.getId()+"}").build();
	}
	
	@DELETE
	@Path("{heroId}")
	public Response deleteHero(@PathParam("heroId") int heroId){
		Hero hero = new HeroService().findHero(heroId);
		
		if(hero==null){
			return Response.status(406).entity("\"Inexistant hero\"").build();
		}
		
		new HeroService().deleteHero(hero);
		
		return Response.status(204).header("x-deleted", hero.getAlias()).build();
	}
		
}
