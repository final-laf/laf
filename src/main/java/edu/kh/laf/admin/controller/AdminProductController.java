package edu.kh.laf.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.laf.product.model.dto.Category;
import edu.kh.laf.product.model.dto.Option;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.service.OptionService;
import edu.kh.laf.product.model.service.ProductService;

@Controller
public class AdminProductController {

	@Autowired
	private ProductService productService;
	
	// 상품관리 : 상품조회
	@GetMapping("/admin/product")
	public String product(
			@RequestParam Map<String, Object> map,
			String[] state,
			Model model) {
		
		// 비어있는 매개변수 제거
		Map<String, Object> paramMap = new HashMap<>();
		for(String key : map.keySet()) {
			Object value = map.get(key);
			if(((String)value).trim().length() != 0)
				paramMap.put(key, value);
		}
		if(state != null) paramMap.put("state", state);
		
		Map<String, Object> resultMap = productService.selectProductList(paramMap);
		List<Product> productList = (List<Product>)resultMap.get("productList");
		List<Map<String, Object>> productCategoryList = productService.selectCategoryListByProductNo(productList);
		List<Category> categoryList = productService.selectAllCategoryList();
				
		model.addAttribute("productList", productList);
		model.addAttribute("resultCategoryList", productCategoryList);
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("pagination", resultMap.get("pagination"));
		model.addAttribute("paramMap", paramMap);
		
		return "/admin/adminProduct/productselect";
	}
	
	// 상품 상태 변경
	@GetMapping("/admin/product/update/state")
	@ResponseBody
	public int updateState(long productNo, String state) {
		return productService.updateState(productNo, state);
	}
	
	// 상품관리 : 상품등록
	@GetMapping("/admin/product/enroll")
	public String productEnroll() {
		return "/admin/adminProduct/productenroll";
	}
	
	// 부모 카테고리 선택 시 자식 카테고리 목록 반환
	@GetMapping("/admin/product/getChildCategories")
	@ResponseBody
	public List<Category> getChildCategories(int categoryNo) {
		System.out.println("들어는 옴");
		return productService.selectChildCategoryList(categoryNo);
	}
	
} 