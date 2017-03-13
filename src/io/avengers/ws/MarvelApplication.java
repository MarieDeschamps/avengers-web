package io.avengers.ws;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("marvel")
public class MarvelApplication extends Application{

	
	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> set = new HashSet<>();
		set.add(HeroResource.class);
		set.add(MovieResource.class);
		set.add(TeamResource.class);
		return set;
	}
}
