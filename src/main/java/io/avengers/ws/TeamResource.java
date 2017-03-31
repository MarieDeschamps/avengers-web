package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.avengers.domain.Hero;
import io.avengers.domain.Team;
import io.avengers.service.HeroService;
import io.avengers.service.TeamService;

@Path("teams")
@Produces(MediaType.APPLICATION_JSON)
public class TeamResource {

	@GET
	public Set<Team> getAllTeams(){
		TeamService hService = new TeamService();
		return hService.findAll();
	}
	
	@GET
	 @Path("{id}")
	public Team getTeamById(@PathParam("id") int id){
		TeamService tService = new TeamService();
		return tService.findTeam(id);
	}
	
	@POST
	public Response createTeam(Team team){
		if(team==null || team.getName().isEmpty()){
			return Response.status(406).entity("\"Empty team\"").build();
		}
		
		new TeamService().createTeam(team);
		
		return Response.status(201).entity("\""+team.getName()+"\"").build();
	}
	
	@POST
	@Path("{teamId}/{heroId}")
	public Response addHeroInTeam(@PathParam("teamId") int teamId, @PathParam("heroId") int heroId){
		Team t = new TeamService().findTeam(teamId);
		Hero h = new HeroService().findHero(heroId);
		
		if(t==null || h==null){
			return Response.status(406).entity("\"Wrong team or hero\"").build();
		}
		
		new TeamService().linkTeamToHero(t,h);
		
		return Response.status(201).entity("\""+t.getName()+" "+ h.getAlias()+"\"").build();
	}
	
	@DELETE
	@Path("{teamId}")
	public Response deleteHero(@PathParam("teamId") int teamId){
		Team team = new TeamService().findTeam(teamId);
		
		if(team==null){
			return Response.status(406).entity("\"Inexistant team\"").build();
		}
		
		new TeamService().deleteTeam(team);
		
		return Response.status(204).header("x-deleted", team.getName()).build();
	}
}
