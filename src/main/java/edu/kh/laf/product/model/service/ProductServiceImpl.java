package edu.kh.laf.product.model.service;

import edu.kh.laf.product.model.dto.Pagination;
import edu.kh.laf.product.model.dto.Product;
import edu.kh.laf.product.model.mapper.ProductMapper;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductMapper mapper;

    public ProductServiceImpl(ProductMapper mapper) {
        this.mapper = mapper;
    }

    // 상품 번호로 상품 정보 조회
    @Override
    public Product selectProduct(long productNo) {
        return mapper.selectProduct(productNo);
    }
    
    // 카테고리별 위클리 베스트 상품 목록 조회(갯수제한)
    @Override
	public List<Product> selectWeeklyBest(int categoryNo, int limit) {
    	Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);
    	
		return mapper.selectWeeklyBest(map);
	}

    // 카테고리 상품 목록 조회
    @Override
    public Map<String, Object> selectCategoryProductList(Map<String, Object> paramMap) {
    	
    	int listCount = mapper.getListCount((int)paramMap.get("categoryNo"));
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"));
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.selectCategoryProductList(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);
    	
    	return resultMap;
    }
    
	// 상품 검색
	@Override
	public Map<String, Object> search(Map<String, Object> paramMap) {
		int listCount = mapper.getSearchListCount((String)paramMap.get("query"));
		Pagination pagination = new Pagination(listCount, (int)paramMap.get("cp"));
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Product> productList = mapper.search(paramMap, rowBounds);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("pagination", pagination);
		resultMap.put("productList", productList);
    	
    	return resultMap;
	}

    
    // 카테고리 상품 목록 조회(갯수제한)
	@Override
	public List<Product> selectCategoryProductList(int categoryNo, int limit) {		
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNo", categoryNo);
		map.put("limit", limit);
		
		return mapper.selectCategoryProductList(map);
	}
	
	// 신규 등록 상품 목록 조회(20개)
	@Override
	public List<Product> selectNewArrivalProductList() {
		return mapper.selectNewArrivalProductList();
	}

	// 개인별 맞춤 상품 추천
	@Override
	public List<Product> selectPersonalProductList(long memberNo) {
		return mapper.selectPersonalProductList(memberNo);
	}

	// 상품별 추천 상품
	@Override
	public List<Product> selectRecommendList(long productNo) {
		return mapper.selectRecommendList(productNo);
	}

	// 카테고리 이름 조회
	@Override
	public String selectCategoryName(int categoryNo) {
		return mapper.selectCategoryName(categoryNo);
	}
}
