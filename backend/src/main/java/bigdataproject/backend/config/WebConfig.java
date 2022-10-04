package bigdataproject.backend.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/").allowedOrigins("").allowedMethods("").allowedHeaders("*")
                .maxAge(6000);
    }

//    Swagger UI ����� 404ó��
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/swagger-ui/index.html").addResourceLocations("classpath:/META-INF/resources/swagger-ui/index.html");
//        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
//    }
}
